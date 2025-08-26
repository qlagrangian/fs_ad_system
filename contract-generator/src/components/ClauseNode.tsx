'use client';

// FIX 1: インポートパスをエイリアスから相対パスに変更
import { ContractNode } from '../lib/mock-contract';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

// FIX 2: typeStylesのキーの型を明示的に指定して堅牢性を向上
const typeStyles: Record<ContractNode['type'], string> = {
  title_section: 'text-xl font-bold mt-6 mb-3',
  article: 'text-base font-semibold mt-4',
  paragraph: 'text-sm ml-4',
  item: 'text-sm ml-8',
  root: '',
  plain_text: 'text-sm'
};

const numberPrefix = (type: ContractNode['type'], number: number): string => {
  if (type === 'article') return `第${number}条 `;
  if (type === 'paragraph') return `${number}. `;
  if (type === 'item') return `(${number}) `;
  return '';
};

interface ClauseNodeProps {
  node: ContractNode;
  selectedNodes: Set<string>;
  onSelectionChange: (id: string, isSelected: boolean) => void;
  numberingContext: number[];
}

export function ClauseNode({ node, selectedNodes, onSelectionChange, numberingContext }: ClauseNodeProps) {
  // isRequiredでない限り、選択されていなければ表示しない
  if (!node.properties.isRequired && !selectedNodes.has(node.id)) {
    return null;
  }

  const currentNumber = numberingContext[numberingContext.length - 1] || 0;
  const prefix = numberPrefix(node.type, currentNumber);
  
  return (
    <div className={typeStyles[node.type]}>
      <div className="flex items-start space-x-2">
        {node.properties.isSelectable && (
          <Checkbox
            id={node.id}
            checked={selectedNodes.has(node.id)}
            onCheckedChange={(checked) => onSelectionChange(node.id, !!checked)}
            className="mt-1"
          />
        )}
        <Label htmlFor={node.id} className="flex-1 cursor-pointer">
          <span className="font-bold">{prefix}</span>
          {node.content}
        </Label>
      </div>

      <div className="pl-4">
        {/* FIX 3: mapの引数に型を明示 */}
        {node.children?.map((child: ContractNode, index: number) => {
           const childContext = [...numberingContext];
           if (['article', 'paragraph', 'item'].includes(child.type)) {
              // ここは子の階層の番号なので、現在の階層の番号(index)とは異なるロジックが必要な場合があります。
              // 今回のプロトタイプでは一旦indexをそのまま使います。
              childContext.push(index + 1);
           }
           return (
            <ClauseNode
              key={child.id}
              node={child}
              selectedNodes={selectedNodes}
              onSelectionChange={onSelectionChange}
              numberingContext={childContext}
            />
           )
        })}
      </div>
    </div>
  );
}