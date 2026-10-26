import { useState } from "react";
import { Card, Title, AreaChart, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Metric, Text, Flex, ProgressBar } from "@tremor/react";
import logo from "./assets/LogoBSJ.png";
import { LayoutDashboard, PackageCheck, Database, ChevronDown } from "lucide-react";

// Monthly sales and collection values displayed in the overview chart.
const monthlyData = [
  { bulan: "Jan", omset: 120, collection: 100 },
  { bulan: "Feb", omset: 160, collection: 140 },
  { bulan: "Mar", omset: 180, collection: 170 },
  { bulan: "Apr", omset: 210, collection: 190 },
];

// Sales target, achieved amount, and achievement percentage for each salesperson.
const omsetData = [
  { nama: "Budi - Jabar", trg_omset: 94, ach_omset: 88, ach_percent: 93 },
  { nama: "Santi - Jateng", trg_omset: 120, ach_omset: 110, ach_percent: 92 },
  { nama: "Agus - Jatim", trg_omset: 66, ach_omset: 55, ach_percent: 83 },
];

// Collection target, collected amount, and achievement percentage for each salesperson.
const collectionData = [
  { nama: "Budi - Jabar", trg_coll: 100, ach_coll: 95, ach_percent: 95 },
  { nama: "Santi - Jateng", trg_coll: 150, ach_coll: 80, ach_percent: 53 },
  { nama: "Agus - Jatim", trg_coll: 95, ach_coll: 30, ach_percent: 32 },
];

// Renders the dashboard, navigation, KPI cards, chart, and performance tables.
export default function App() {
  // Tracks the currently selected dashboard page.
  const [activeMenu, setActiveMenu] = useState("Sales Overview");
  // Controls the mobile navigation drawer and its backdrop.
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Controls whether the Update Data submenu is expanded.
  const [updateOpen, setUpdateOpen] = useState(false);

  // Defines the sidebar items, icons, and nested update pages.
  const menus = [
    { name: "Sales Overview", icon: LayoutDashboard },
    { name: "Product Achievement", icon: PackageCheck },
    {
      name: "Update Data",
      icon: Database,
      children: ["Sales Update", "Collection Update"],
    },
  ];

  // Builds the responsive dashboard layout.
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 md:flex">
      {/* Mobile menu toggle button. */}
      <button
        type="button"
        className="fixed right-4 top-4 z-30 rounded-lg border border-slate-200 bg-white p-2 text-slate-700 shadow-sm md:hidden"
        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileMenuOpen}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <span className="text-xl leading-none">{mobileMenuOpen ? "âœ•" : "â˜°"}</span>
      </button>

      {/* Closes the mobile menu when the user taps outside the drawer. */}
      {mobileMenuOpen && <button type="button" aria-label="Close menu" className="fixed inset-0 z-10 bg-slate-950/30 md:hidden" onClick={() => setMobileMenuOpen(false)} />}

      {/* Sidebar branding and primary navigation. */}
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

        {/* Render each menu item and its optional nested pages. */}
        <nav aria-label="Navigasi utama" className="space-y-1">
          {menus.map((menu) => {
            const Icon = menu.icon;
            // Builds the responsive dashboard layout.
            return (
              <div key={menu.name}>
                {/* Main navigation item and its selection behavior. */}
                <button
                  type="button"
                  onClick={() => {
                    if (menu.children) {
                      setUpdateOpen(!updateOpen);
                    } else {
                      setActiveMenu(menu.name);
                      setMobileMenuOpen(false);
                    }
                  }}
                  className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                    activeMenu === menu.name || (menu.children && menu.children.includes(activeMenu)) ? "bg-indigo-500 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="w-5 flex justify-center">
                      <Icon size={18} className="shrink-0" />
                    </span>
                    {menu.name}
                  </span>

                  {menu.children && <ChevronDown size={14} className={`transition-transform ${updateOpen ? "rotate-180" : ""}`} />}
                </button>

                {/* Nested pages shown when the Update Data menu is expanded. */}
                {menu.children && updateOpen && (
                  <div className="ml-8 mt-1 space-y-1 border-l border-slate-800 pl-3">
                    {menu.children.map((child) => (
                      <button
                        key={child}
                        type="button"
                        onClick={() => {
                          setActiveMenu(child);
                          setMobileMenuOpen(false);
                        }}
                        className={`flex w-full rounded-md px-3 py-2 text-left text-sm transition ${activeMenu === child ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"}`}
                      >
                        {child}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
        <p className="mt-auto px-3 text-xs text-slate-500">created by Joseph - 2026 BSJ</p>
      </aside>

      {/* Main content area for the selected dashboard page. */}
      <main className="min-w-0 flex-1 p-4 pt-16 md:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-1 text-2xl font-bold md:text-3xl">{activeMenu}</h1>
          <p className="mb-6 text-sm text-slate-500">Halaman {activeMenu}</p>

          {/* KPI cards summarize total sales and collection performance. */}
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

          {/* Monthly area chart comparing sales and collection. */}
          <Card className="mb-6">
            <Title>Omset vs Collection</Title>
            <AreaChart className="h-64 md:h-72 mt-4" data={monthlyData} index="bulan" categories={["omset", "collection"]} colors={["indigo", "emerald"]} />
          </Card>

          {/* Performance tables stack on small screens and sit side by side on larger screens. */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Sales performance table. */}
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
            {/* Collection performance table. */}
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
