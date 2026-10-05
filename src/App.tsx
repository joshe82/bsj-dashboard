import { Card, Title, AreaChart, BarChart, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Metric, Text } from "@tremor/react";

const monthlyData = [
  { bulan: "Jan", omset: 120, collection: 100 },
  { bulan: "Feb", omset: 160, collection: 140 },
  { bulan: "Mar", omset: 180, collection: 170 },
  { bulan: "Apr", omset: 210, collection: 190 },
];

const salesmanData = [
  { nama: "Budi - Jabar", ach_omset: 94, ach_coll: 88 },
  { nama: "Santi - Jateng", ach_omset: 120, ach_coll: 110 },
  { nama: "Agus - Jatim", ach_omset: 66, ach_coll: 55 },
];

const productData = [
  { product: "BSJ Gold", penjualan: 120 },
  { product: "BSJ Reguler", penjualan: 90 },
  { product: "BSJ Sachet", penjualan: 150 },
];

export default function App() {
  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-1">Dashboard BSJ</h1>
        <p className="text-slate-500 mb-6 text-sm md:text-base">Versi Responsive HP & Tablet</p>

        {/* KPI - di HP jadi 1 kolom, Tablet 2 kolom, Desktop 4 kolom */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <Text>Total Omset</Text>
            <Metric className="text-xl md:text-3xl">Rp 570 Jt</Metric>
          </Card>
          <Card>
            <Text>Total Collection</Text>
            <Metric className="text-xl md:text-3xl">Rp 500 Jt</Metric>
          </Card>
          <Card>
            <Text>Best Salesman</Text>
            <Metric className="text-xl md:text-3xl">Santi</Metric>
          </Card>
          <Card>
            <Text>Best Product</Text>
            <Metric className="text-xl md:text-3xl">Sachet</Metric>
          </Card>
        </div>

        {/* Chart Utama - selalu full width */}
        <Card className="mb-6">
          <Title>Omset vs Collection</Title>
          <AreaChart className="h-64 md:h-72 mt-4" data={monthlyData} index="bulan" categories={["omset", "collection"]} colors={["indigo", "emerald"]} />
        </Card>

        {/* Bawah - di HP numpuk ke bawah, di Desktop baru sebelahan */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <Title>Per Salesman</Title>
            {/* Tambah overflow biar tabel bisa di swipe di HP */}
            <div className="overflow-x-auto mt-4">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>Nama</TableHeaderCell>
                    <TableHeaderCell>Omset</TableHeaderCell>
                    <TableHeaderCell>Coll</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {salesmanData.map((s) => (
                    <TableRow key={s.nama}>
                      <TableCell>{s.nama}</TableCell>
                      <TableCell>{s.ach_omset}%</TableCell>
                      <TableCell>{s.ach_coll}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
          <Card>
            <Title>Per Product</Title>
            <BarChart className="h-64 md:h-72 mt-4" data={productData} index="product" categories={["penjualan"]} colors={["indigo"]} />
          </Card>
        </div>
      </div>
    </div>
  );
}
