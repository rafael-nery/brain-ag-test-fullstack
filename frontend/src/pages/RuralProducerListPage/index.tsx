import React from 'react'
import Layout from "@/pages/Layout";
import {ListDataTable} from "@/pages/RuralProducerListPage/components/ListDataTable.tsx";

function RuralProducerListPage(): React.JSX.Element {
  return (
    <Layout>
      <div className="hidden flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Produtor Rural - Listagem</h2>
            <div className="flex items-center space-x-2">
            </div>
          </div>
          <div className="space-y-4">
            <ListDataTable/>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default RuralProducerListPage
