import React from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Flex,
  Icon,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Button,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
} from '@chakra-ui/react';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

export type SimpleTableProps<Data extends object> = {
  loading: boolean;
  data: Data[];
  columns: ColumnDef<Data, any>[];
  paginationOptions?: {
    isManual: boolean;
    totalCount: number;
    fetchNextPage: (pageIndex: number, pageSize: number) => void;
  };
};

export default function SimpleTable<Data extends object>({
  loading,
  data,
  columns,
  paginationOptions,
}: SimpleTableProps<Data>) {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: paginationOptions?.isManual,
    ...(paginationOptions?.isManual && {
      pageCount: paginationOptions?.totalCount,
    }),
    defaultColumn: {
      minSize: 0,
      size: Number.MAX_SAFE_INTEGER,
      maxSize: Number.MAX_SAFE_INTEGER,
    }
  });

  return (
    <TableContainer border="1px solid #E6E6E6" borderRadius="12px" pt={2}>
      <Table variant="simple">
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
                const meta: any = header.column.columnDef.meta;
                return (
                  <Th key={header.id} isNumeric={meta?.isNumeric} w={ header.getSize() === Number.MAX_SAFE_INTEGER ? "auto" : header.getSize()}>
                    <Flex
                      justify="space-between"
                      align="center"
                      fontSize={{ sm: '10px', lg: '12px' }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </Flex>
                  </Th>
                );
              })}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => {
                // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
                const meta: any = cell.column.columnDef.meta;
                return (
                  <Td key={cell.id} isNumeric={meta?.isNumeric} w={cell.column.getSize() === Number.MAX_SAFE_INTEGER ? "auto" : cell.column.getSize()}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                );
              })}
            </Tr>
          ))}
        </Tbody>
      </Table>
      {paginationOptions && (
        <PaginationFooter
          pageIndex={table.getState().pagination.pageIndex}
          pageSize={table.getState().pagination.pageSize}
          totalCount={paginationOptions.totalCount}
          getPageCount={table.getPageCount}
          setPageIndex={table.setPageIndex}
          previousPage={table.previousPage}
          getCanPreviousPage={table.getCanPreviousPage}
          nextPage={table.nextPage}
          getCanNextPage={table.getCanNextPage}
        />
      )}
    </TableContainer>
  );
}

interface PaginationFooterProps {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  getPageCount: () => number;
  setPageIndex: (pageIndex: number) => void;
  previousPage: () => void;
  getCanPreviousPage: () => boolean;
  nextPage: () => void;
  getCanNextPage: () => boolean;
}

const PaginationFooter = ({
  pageIndex,
  pageSize,
  totalCount,
  getPageCount,
  setPageIndex,
  previousPage,
  getCanPreviousPage,
  nextPage,
  getCanNextPage,
}: PaginationFooterProps) => {
  const createPages = (count: number) => {
    let arrPageCount = [];

    if (count < pageSize) return [1];

    for (let i = 1; i <= count; i++) {
      arrPageCount.push(i);
    }

    return arrPageCount;
  };

  return (
    <Flex
      direction={{ sm: 'column', md: 'row' }}
      justify="space-between"
      align="center"
      w="100%"
      px='22px'
      py='16px'
    >
      <Text
        fontSize="sm"
        color="gray.500"
        fontWeight="normal"
        mb={{ sm: '24px', md: '0px' }}
      >
        Mostrando {pageSize * pageIndex + 1} a{' '}
        {pageSize * (pageIndex + 1) <= totalCount
          ? pageSize * (pageIndex + 1)
          : totalCount}{' '}
        de {totalCount} entradas
      </Text>
      <Stack direction="row" alignSelf="flex-end" spacing="4px" ms="auto">
        <Button
          variant="no-effects"
          onClick={() => previousPage()}
          transition="all .5s ease"
          w="40px"
          h="40px"
          borderRadius="8px"
          bg="#fff"
          border="1px solid lightgray"
          display={
            pageSize === 5 ? 'none' : getCanPreviousPage() ? 'flex' : 'none'
          }
          _hover={{
            opacity: '0.7',
            borderColor: 'gray.500',
          }}
        >
          <Icon as={GrFormPrevious} w="16px" h="16px" color="gray.400" />
        </Button>
        {pageSize === 5 ? (
          <NumberInput
            max={getPageCount() - 1}
            min={1}
            w="75px"
            mx="6px"
            defaultValue="1"
            onChange={(e) => setPageIndex(+e)}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper onClick={() => nextPage()} />
              <NumberDecrementStepper onClick={() => previousPage()} />
            </NumberInputStepper>
          </NumberInput>
        ) : (
          createPages(getPageCount()).map((pageNumber, index) => {
            return (
              <Button
                variant="no-effects"
                transition="all .5s ease"
                onClick={() => setPageIndex(pageNumber - 1)}
                w="40px"
                h="40px"
                borderRadius="8px"
                bg={pageNumber === pageIndex + 1 ? 'kours.primary' : '#fff'}
                border={
                  pageNumber === pageIndex + 1 ? 'none' : '1px solid lightgray'
                }
                _hover={{
                  opacity: '0.7',
                  borderColor: 'gray.500',
                }}
                key={index}
              >
                <Text
                  fontSize="sm"
                  color={pageNumber === pageIndex + 1 ? '#fff' : 'gray.600'}
                >
                  {pageNumber}
                </Text>
              </Button>
            );
          })
        )}
        <Button
          variant="no-effects"
          onClick={() => nextPage()}
          transition="all .5s ease"
          w="40px"
          h="40px"
          borderRadius="8px"
          bg="#fff"
          border="1px solid lightgray"
          display={pageSize === 5 ? 'none' : getCanNextPage() ? 'flex' : 'none'}
          _hover={{
            bg: 'gray.200',
            opacity: '0.7',
            borderColor: 'gray.500',
          }}
        >
          <Icon as={GrFormNext} w="16px" h="16px" color="gray.400" />
        </Button>
      </Stack>
    </Flex>
  );
};
