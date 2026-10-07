import { useState } from "react";
import { Card, Title, AreaChart, BarChart, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Metric, Text, DonutChart, Flex, ProgressBar } from "@tremor/react";

const monthlyData = [
  { bulan: "Jan", omset: 120, collection: 100 },
  { bulan: "Feb", omset: 160, collection: 140 },
  { bulan: "Mar", omset: 180, collection: 170 },
  { bulan: "Apr", omset: 210, collection: 190 },
];

const omsetData = [
  { nama: "Budi - Jabar", ach_omset: 94, ach_coll: 88 },
  { nama: "Santi - Jateng", ach_omset: 120, ach_coll: 110 },
  { nama: "Agus - Jatim", ach_omset: 66, ach_coll: 55 },
];

export default function App() {
  const [activeMenu, setActiveMenu] = useState("Sales Overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menus = ["Sales Overview", "Penjualan", "AI Insight"];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 md:flex">
      <button
        type="button"
        className="fixed right-4 top-4 z-30 rounded-lg border border-slate-200 bg-white p-2 text-slate-700 shadow-sm md:hidden"
        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileMenuOpen}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <span className="text-xl leading-none">{mobileMenuOpen ? "✕" : "☰"}</span>
      </button>

      {mobileMenuOpen && <button type="button" aria-label="Close menu" className="fixed inset-0 z-10 bg-slate-950/30 md:hidden" onClick={() => setMobileMenuOpen(false)} />}

      <aside className={`fixed inset-y-0 left-0 z-20 flex w-64 flex-col bg-slate-950 px-5 py-6 text-white transition-transform md:sticky md:top-0 md:h-screen md:translate-x-0 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="mb-9 flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-500 font-bold">B</div>
          <div>
            <p className="font-semibold">DASHBOARD</p>
            <p className="text-xs text-slate-400">PT Buana Setia Jaya</p>
          </div>
        </div>
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Menu</p>
        <nav aria-label="Navigasi utama" className="space-y-1">
          {menus.map((menu, index) => (
            <button
              key={menu}
              type="button"
              onClick={() => {
                setActiveMenu(menu);
                setMobileMenuOpen(false);
              }}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${activeMenu === menu ? "bg-indigo-500 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"}`}
            >
              <span aria-hidden="true" className="w-5 text-center">
                {index === 0 ? "🏠" : index === 1 ? "📊" : "🤖"}
              </span>
              {menu}
            </button>
          ))}
        </nav>
        <p className="mt-auto px-3 text-xs text-slate-500">© 2026 BSJ</p>
      </aside>

      <main className="min-w-0 flex-1 p-4 pt-16 md:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-1 text-2xl font-bold md:text-3xl">{activeMenu === "Sales Overview" ? "SALES OVERVIEW" : activeMenu === "AI Insight" ? "AI Insight" : "Penjualan BSJ"}</h1>
          <p className="mb-6 text-sm text-slate-500 md:text-base">{activeMenu === "Sales Overview" ? "Versi Responsive HP & Tablet" : activeMenu === "AI Insight" ? "Insight AI" : "Ringkasan performa penjualan"}</p>

          {/* KPI - di HP jadi 1 kolom, Tablet 2 kolom, Desktop 4 kolom */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card className="flex flex-col justify-between">
              <div>
                <Text>Total Omset</Text>
                <Metric className="text-3xl mt-1">Rp 570 Jt</Metric>

                <div className="mt-6">
                  <Flex>
                    <Text>Achievement</Text>
                    <Text className="font-medium">57%</Text>
                  </Flex>
                  <ProgressBar value={57} color="indigo" className="mt-2" />
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200">
                <Flex>
                  <Text>Target</Text>
                  <Text className="font-medium">Rp 1.000 Jt</Text>
                </Flex>
                <Flex className="mt-2">
                  <Text>Achieved</Text>
                  <Text className="font-medium text-indigo-600">Rp 570 Jt</Text>
                </Flex>
                <Flex className="mt-1">
                  <Text>Remaining</Text>
                  <Text className="font-medium">Rp 430 Jt</Text>
                </Flex>
              </div>
            </Card>

            <Card className="flex flex-col justify-between">
              <div>
                <Text>Total Collection</Text>
                <Metric className="text-3xl mt-1">Rp 500 Jt</Metric>

                <div className="mt-6">
                  <Flex>
                    <Text>Achievement</Text>
                    <Text className="font-medium">85%</Text>
                  </Flex>
                  <ProgressBar value={85} color="indigo" className="mt-2" />
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200">
                <Flex>
                  <Text>Target</Text>
                  <Text className="font-medium">Rp 588 Jt</Text>
                </Flex>
                <Flex className="mt-2">
                  <Text>Collected</Text>
                  <Text className="font-medium text-indigo-600">Rp 500 Jt</Text>
                </Flex>
                <Flex className="mt-1">
                  <Text>Remaining</Text>
                  <Text className="font-medium">Rp 88 Jt</Text>
                </Flex>
              </div>
            </Card>
          </div>

          {/* Chart Utama - selalu full width */}
          <Card className="mb-6">
            <Title>Omset vs Collection</Title>
            <AreaChart className="h-64 md:h-72 mt-4" data={monthlyData} index="bulan" categories={["omset", "collection"]} colors={["indigo", "emerald"]} />
          </Card>

          {/* Bawah - di HP numpuk ke bawah, di Desktop baru sebelahan */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <Title>OMSET</Title>
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
                    {omsetData.map((s) => (
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
              <Title>COLLECTION</Title>
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
                    {omsetData.map((s) => (
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
          </div>
        </div>
      </main>
    </div>
  );
}
