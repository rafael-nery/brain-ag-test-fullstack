import {useEffect, useState} from "react";
import Layout from "@/pages/Layout";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip} from "recharts";
import axios from "axios";
import {Loader2} from "lucide-react";

interface DashboardData {
  totalFarms: number;
  totalArea: number;
  stateDistribution: Array<{
    state: string;
    count: number;
    percentage: number;
  }>;
  cropDistribution: Array<{
    crop: string;
    count: number;
    percentage: number;
  }>;
  landUseDistribution: {
    arableLand: number;
    vegetationArea: number;
    arableLandPercentage: number;
    vegetationAreaPercentage: number;
  };
}

const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8',
  '#82ca9d', '#ffc658', '#ff7300', '#a4de6c', '#d0ed57'
];

function DashboardPage(): React.JSX.Element {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/producers/dashboard/totals');
        setData(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="flex h-screen items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </Layout>
    );
  }

  const landUseData = data ? [
    { name: "Área Agricultável", value: data.landUseDistribution.arableLandPercentage },
    { name: "Área de Vegetação", value: data.landUseDistribution.vegetationAreaPercentage }
  ] : [];

  return (
    <Layout>
      <div className="flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          </div>

          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total de Fazendas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data?.totalFarms}</div>
                  <p className="text-xs text-muted-foreground">
                    fazendas cadastradas
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Área Total
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data?.totalArea.toLocaleString()} ha</div>
                  <p className="text-xs text-muted-foreground">
                    hectares de área total
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {/* Gráfico de Estados */}
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Distribuição por Estado</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={data?.stateDistribution}
                        dataKey="percentage"
                        nameKey="state"
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        label
                      >
                        {data?.stateDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Gráfico de Culturas */}
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Distribuição por Cultura</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={data?.cropDistribution}
                        dataKey="count"
                        nameKey="crop"
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        label
                      >
                        {data?.cropDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Gráfico de Uso do Solo */}
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Uso do Solo</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={landUseData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        label
                      >
                        {landUseData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default DashboardPage;