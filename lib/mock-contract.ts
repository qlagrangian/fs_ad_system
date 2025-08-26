// 型定義: スキーマの構造をTypeScriptの型として定義
export interface ContractNode {
  id: string;
  type: 'root' | 'title_section' | 'article' | 'paragraph' | 'item' | 'plain_text';
  content: string;
  properties: {
    isSelectable?: boolean;
    selectionMode?: 'checkbox' | 'radio';
    isRequired?: boolean;
    defaultSelected?: boolean;
    references?: string[];
  };
  children: ContractNode[];
}

export interface ContractTemplate {
  templateId: string;
  templateName: string;
  version: string;
  globals: {
    key: string;
    label: string;
    type: 'text' | 'number' | 'date' | 'currency';
    defaultValue?: string | number;
  }[];
  structure: ContractNode;
}

// モックデータ本体
export const mockTemplate: ContractTemplate = {
  templateId: 'MA_ADVISORY_V4_SELLSIDE',
  templateName: 'M&Aアドバイザリー契約書（プロトタイプ）',
  version: '1.0.0',
  globals: [
    { key: 'clientName', label: '依頼者名', type: 'text', defaultValue: '株式会社テスト' },
    { key: 'contractDate', label: '契約締結日', type: 'date' },
  ],
  structure: {
    id: 'root',
    type: 'root',
    content: '',
    properties: {},
    children: [
      {
        id: 'title_1',
        type: 'title_section',
        content: '目的',
        properties: {},
        children: [
          {
            id: 'article_1',
            type: 'article',
            content: '甲（{clientName}）は、乙に対し、{{ref:article_3}}に定める本件業務を行うことを委託し、乙はこれを受託するものとします。',
            properties: { isRequired: true },
            children: [],
          },
        ],
      },
      {
        id: 'title_2',
        type: 'title_section',
        content: '定義',
        properties: {},
        children: [
          {
            id: 'article_2',
            type: 'article',
            content: '本契約において、本条各号の用語は、それぞれ本条各号に規定する意味を有します。',
            properties: { isRequired: true },
            children: [
              {
                id: 'item_2_1',
                type: 'item',
                content: '「情報提供料」とは、本件提携に関する提携候補先の情報の提供に対する対価をいいます。',
                properties: { isSelectable: true, defaultSelected: true },
                children: [],
              },
              {
                id: 'item_2_2',
                type: 'item',
                content: '「業務中間報酬」とは、...（中略）...の各業務に対する対価をいいます。',
                properties: { isSelectable: true, defaultSelected: false },
                children: [],
              },
              {
                id: 'item_2_3',
                type: 'item',
                content: '「成功報酬」とは、...（中略）...提供された業務の対価をいいます。',
                properties: { isSelectable: true, defaultSelected: true },
                children: [],
              },
            ],
          },
        ],
      },
       {
        id: 'title_3',
        type: 'title_section',
        content: '本件業務の範囲',
        properties: {},
        children: [
          {
            id: 'article_3',
            type: 'article',
            content: '乙は、本件提携の仲介に関する以下に列挙する本件業務を、適宜執り行うものとします。',
            properties: { isRequired: true },
            children: [],
          },
        ],
      },
    ],
  },
};