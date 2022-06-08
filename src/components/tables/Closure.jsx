import Table from 'rc-table'

const columns = [
  {
    title: 'Goto',
    dataIndex: 'goto',
    key: 'goto',
    width: 100,
  },
  {
    title: 'Kernel',
    dataIndex: 'kernel',
    key: 'kernel',
    width: 300,
  },
  {
    title: 'State',
    dataIndex: 'state',
    key: 'state',
    width: 50,
  },
  {
    title: 'Closure',
    dataIndex: 'closure',
    key: 'closure',
    width: 1000,
  },
]

export const Closure = ({ data }) => <Table columns={columns} data={data} />
