import Table from 'rc-table'

const Symbol = (s) => (
  <div className="flex">
    {Array.from(s.keys()).map((s) => (
      <div key={s} className="m-1 px-2 rounded-sm bg-teal-900 bg-opacity-10">
        {s}
      </div>
    ))}
  </div>
)

const columns = [
  {
    title: 'Symbol',
    dataIndex: 'symbol',
    key: 'symbol',
    width: 100,
  },
  {
    title: 'First Symbols',
    dataIndex: 'symbols',
    key: 'symbols',
    width: 300,
    render: Symbol,
  },
]

export const First = ({ data }) => <Table columns={columns} data={data} />
