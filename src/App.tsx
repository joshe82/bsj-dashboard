import { useState } from "react";
import { Card, Title, AreaChart, BarChart, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Metric, Text, DonutChart, Flex, ProgressBar } from "@tremor/react";
import logo from "./assets/LogoBSJ.png";

const monthlyData = [
  { bulan: "Jan", omset: 120, collection: 100 },
  { bulan: "Feb", omset: 160, collection: 140 },
  { bulan: "Mar", omset: 180, collection: 170 },
  { bulan: "Apr", omset: 210, collection: 190 },
];

const omsetData = [
  { nama: "Budi - Jabar", trg_omset: 94, ach_omset: 88, ach_percent: 93 },
  { nama: "Santi - Jateng", trg_omset: 120, ach_omset: 110, ach_percent: 92 },
  { nama: "Agus - Jatim", trg_omset: 66, ach_omset: 55, ach_percent: 83 },
];

const collectionData = [
  { nama: "Budi - Jabar", trg_coll: 100, ach_coll: 95, ach_percent: 95 },
  { nama: "Santi - Jateng", trg_coll: 150, ach_coll: 80, ach_percent: 53 },
  { nama: "Agus - Jatim", trg_coll: 95, ach_coll: 30, ach_percent: 32 },
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
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-white font-bold">
            <img src={logo} alt="Logo" className="h-8 w-8 object-contain" />
          </div>
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
          <p className="mb-6 text-sm text-slate-500 md:text-base">{activeMenu === "Sales Overview" ? "Achievement Omset & Collection" : activeMenu === "AI Insight" ? "Insight AI" : "Ringkasan performa penjualan"}</p>

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
              <div className="overflow-x-auto mt-4 -mx-6 px-6">
                <Table className="w-full table-fixed">
                  <TableHead>
                    <TableRow>
                      <TableHeaderCell className="w-[35%] px-2 py-2 text-[11px] md:text-sm">Nama</TableHeaderCell>
                      <TableHeaderCell className="px-2 py-2 text-[11px] md:text-sm">Target</TableHeaderCell>
                      <TableHeaderCell className="px-2 py-2 text-[11px] md:text-sm">Actual</TableHeaderCell>
                      <TableHeaderCell className="px-2 py-2 text-[11px] md:text-sm">Percent</TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {omsetData.map((s) => (
                      <TableRow key={s.nama}>
                        <TableCell className="w-[35%] px-2 py-2 text-[11px] md:text-sm">{s.nama}</TableCell>
                        <TableCell className="px-2 py-2 text-[11px] md:text-sm">{s.trg_omset}</TableCell>
                        <TableCell className="px-2 py-2 text-[11px] md:text-sm">{s.ach_omset}</TableCell>
                        <TableCell className="px-2 py-2 text-[11px] md:text-sm">{s.ach_percent}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
            <Card>
              <Title>COLLECTION</Title>
              <div className="overflow-x-auto mt-4 -mx-6 px-6">
                <Table className="w-full">
                  <TableHead>
                    <TableRow>
                      <TableHeaderCell className="w-[35%] px-2 py-2 text-[11px] md:text-sm">Nama</TableHeaderCell>
                      <TableHeaderCell className="px-2 py-2 text-[11px] md:text-sm">Target</TableHeaderCell>
                      <TableHeaderCell className="px-2 py-2 text-[11px] md:text-sm">Actual</TableHeaderCell>
                      <TableHeaderCell className="px-2 py-2 text-[11px] md:text-sm">Percent</TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {collectionData.map((s) => (
                      <TableRow key={s.nama}>
                        <TableCell className="w-[35%] px-2 py-2 text-[11px] md:text-sm">{s.nama}</TableCell>
                        <TableCell className="px-2 py-2 text-[11px] md:text-sm">{s.trg_coll}</TableCell>
                        <TableCell className="px-2 py-2 text-[11px] md:text-sm">{s.ach_coll}</TableCell>
                        <TableCell className="px-2 py-2 text-[11px] md:text-sm">{s.ach_percent}%</TableCell>
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
