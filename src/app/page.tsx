"use client";
import { Flex, Text } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";

import data from "@/shared/assets/json/data.json";
import SimpleTable from "@/components/SimpleTable";
import { useMemo } from "react";

type MarkedData = {
  Segmento: string;
  Pais: string;
  Organização: string;
  Produto: string;
  Desconto: string;
  Quantidade: number;
  CustoUnitario: number;
  PrecoUnitario: number;
  VendaBruto: number;
  Desconto2: number;
  Venda: number;
  Lucro: number;
  Date: number;
};

const columnHelper = createColumnHelper<MarkedData>();

const columns = [
  columnHelper.accessor("Segmento", {
    header: "Segmento",
    cell: (info) => <Text>{info.row.original.Segmento}</Text>,
  }),
  columnHelper.accessor("Pais", {
    header: "Pais",
    cell: (info) => <Text>{info.row.original.Pais}</Text>,
  }),
  columnHelper.accessor("Organização", {
    header: "Organização",
    cell: (info) => <Text>{info.row.original.Organização}</Text>,
  }),
  columnHelper.accessor("Produto", {
    header: "Produto",
    cell: (info) => <Text>{info.row.original.Produto}</Text>,
  }),
  columnHelper.accessor("Desconto", {
    header: "Desconto",
    cell: (info) => <Text>{info.row.original.Desconto}</Text>,
  }),
  columnHelper.accessor("Quantidade", {
    header: "Quantidade",
    cell: (info) => <Text>{info.row.original.Quantidade}</Text>,
  }),
  columnHelper.accessor("CustoUnitario", {
    header: "Custo Unitario",
    cell: (info) => <Text>{info.row.original.CustoUnitario}</Text>,
  }),
  columnHelper.accessor("PrecoUnitario", {
    header: "Preco Unitario",
    cell: (info) => <Text>{info.row.original.PrecoUnitario}</Text>,
  }),
  columnHelper.accessor("VendaBruto", {
    header: "Venda Bruto",
    cell: (info) => <Text>{info.row.original.VendaBruto}</Text>,
  }),
  columnHelper.accessor("Desconto2", {
    header: "Desconto 2",
    cell: (info) => <Text>{info.row.original.Desconto2}</Text>,
  }),
  columnHelper.accessor("Venda", {
    header: "Venda",
    cell: (info) => <Text>{info.row.original.Venda}</Text>,
  }),
  columnHelper.accessor("Lucro", {
    header: "Lucro",
    cell: (info) => <Text>{info.row.original.Lucro}</Text>,
  }),
  columnHelper.accessor("Date", {
    header: "Date",
    cell: (info) => <Text>{info.row.original.Date}</Text>,
  }),
];

export default function Home() {
  const cachedData = useMemo(() => data, []);
  return (
    <Flex padding={5}>
      <SimpleTable loading={false} columns={columns} data={cachedData as MarkedData[]} />
    </Flex>
  );
}
