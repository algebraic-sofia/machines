import Table from 'rc-table'

const getColumns = (nonTerminals, terminals) => {
  return [
    {
      title: 'State',
      dataIndex: 'state',
      key: 'goto',
      width: 100,
    },
    {
      title: 'Action',
      dataIndex: 'Action',
      key: 'kernel',
      width: 300,
      children: terminals.map((terminal) => ({
        title: terminal,
        dataIndex: terminal,
        key: terminal,
        width: 100,
      })),
    },
    {
      title: 'Goto',
      dataIndex: 'goto',
      key: 'kernel',
      width: 300,
      children: nonTerminals.map((non) => ({
        title: non,
        dataIndex: non,
        key: non,
        width: 100,
      })),
    },
  ]
}

export const GotoAction = ({
  terminals = [],
  nonTerminals = [],
  data = [],
}) => <Table columns={getColumns(nonTerminals, terminals)} data={data} />
