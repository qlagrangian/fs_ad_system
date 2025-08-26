'use client';

import { useState, useMemo } from 'react';
import { ContractTemplate } from '@/lib/mock-contract';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ClauseNode } from './ClauseNode';

// 初期選択状態を計算するヘルパー関数
const getInitialSelectedNodes = (node: ContractTemplate['structure']): Set<string> => {
  let selected = new Set<string>();
  function traverse(currentNode: ContractTemplate['structure']) {
    if (currentNode.properties.isSelectable && currentNode.properties.defaultSelected) {
      selected.add(currentNode.id);
    }
    currentNode.children.forEach(traverse);
  }
  traverse(node);
  return selected;
};

export function ContractSheet({ template }: { template: ContractTemplate }) {
  // グローバル変数の状態管理
  const [globals, setGlobals] = useState(() =>
    Object.fromEntries(template.globals.map((g) => [g.key, g.defaultValue || '']))
  );
  // 条項選択の状態管理
  const [selectedNodes, setSelectedNodes] = useState(() => getInitialSelectedNodes(template.structure));

  const handleGlobalChange = (key: string, value: string | number) => {
    setGlobals((prev) => ({ ...prev, [key]: value }));
  };
  
  const handleSelectionChange = (id: string, isSelected: boolean) => {
    setSelectedNodes(prev => {
      const newSet = new Set(prev);
      if (isSelected) {
        newSet.add(id);
      } else {
        newSet.delete(id);
      }
      return newSet;
    });
  };

  // プレビュー用に本文の変数を置換する処理（デモ用）
  const processedStructure = useMemo(() => {
    let structureString = JSON.stringify(template.structure);
    Object.entries(globals).forEach(([key, value]) => {
      structureString = structureString.replace(new RegExp(`{${key}}`, 'g'), String(value));
    });
    // 参照はデモのため簡易的にIDを置換
    structureString = structureString.replace(/{{ref:(.*?)}}/g, '「$1」');
    return JSON.parse(structureString);
  }, [template.structure, globals]);


  const handleGenerate = () => {
    console.log("--- GENERATION PAYLOAD ---");
    console.log("Globals:", globals);
    console.log("Selected Nodes:", Array.from(selectedNodes));
    alert("コンソールに生成データが出力されました。");
  };

  return (
    <Card className="w-full max-w-4xl mx-auto my-8">
      <CardHeader>
        <CardTitle>{template.templateName}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 mb-6">
          <h3 className="font-semibold">グローバル変数</h3>
          {template.globals.map((g) => (
            <div key={g.key} className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={g.key} className="text-right">{g.label}</Label>
              <Input
                id={g.key}
                type={g.type}
                value={globals[g.key]}
                onChange={(e) => handleGlobalChange(g.key, e.target.value)}
                className="col-span-3"
              />
            </div>
          ))}
        </div>
        <Separator />
        
        {/* 再帰コンポーネントの呼び出し */}
        <ClauseNode 
          node={processedStructure} 
          selectedNodes={selectedNodes} 
          onSelectionChange={handleSelectionChange}
          numberingContext={[]}
        />

      </CardContent>
      <CardFooter>
        <Button onClick={handleGenerate} className="w-full">
          契約書生成（コンソールに出力）
        </Button>
      </CardFooter>
    </Card>
  );
}