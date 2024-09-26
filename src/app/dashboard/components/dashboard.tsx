"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Decimal } from "@prisma/client/runtime/library";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { searchReleases } from "../_actions/search";

interface Release {
  ID_LANCAMENTO: string;
  ID_CATEGORIA: string | null;
  ID_USUARIO: number | null;
  VALOR: Decimal | null; // Ou Decimal se você estiver usando um tipo Decimal específico
  DATA: Date | null;
  DESCRICAO: string | null;
  STATUS: string;
  usuarios?: {
    NOME: string;
  } | null;
  categorias?: {
    DESCRICAO: string | null;
  } | null;
}

export const Dashboard = () => {
  const [name, setName] = useState("");
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();
  const [type, setType] = useState("All");
  const [releases, setReleases] = useState<Release[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const fetchReleases = async () => {
      const foundReleases = await searchReleases(name, fromDate, toDate, type);
      setReleases(foundReleases);
    };

    fetchReleases();
  };

  return (
    <div className="container mx-auto space-y-8 p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Pesquisar por nome..."
            />
          </div>
          <div className="space-y-2">
            <Label>Data Inicial</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {fromDate
                    ? format(fromDate, "PPP")
                    : format(
                        new Date(new Date().setDate(new Date().getDate() - 30)),
                        "PPP",
                      )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={fromDate}
                  onSelect={setFromDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <Label>Data Final</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {toDate ? format(toDate, "PPP") : format(new Date(), "PPP")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={toDate}
                  onSelect={setToDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <Label>Tipo</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">Todas</SelectItem>
                <SelectItem value="Expenses">Despesas</SelectItem>
                <SelectItem value="Income">Receitas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button type="submit">Buscar</Button>
      </form>

      <div
        style={{
          color:
            releases.reduce(
              (total, item) => total + Number(item.VALOR || 0),
              0,
            ) >= 0
              ? "green"
              : "red",
          fontWeight: "bold",
        }}
      >
        <span>Valor Total: </span>
        {Math.abs(
          releases.reduce((total, item) => total + Number(item.VALOR || 0), 0),
        ).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: 2,
        })}
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Usuário</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Recibos</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {releases.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.usuarios?.NOME}</TableCell>
              <TableCell>{item.DESCRICAO}</TableCell>
              <TableCell>{item.categorias?.DESCRICAO}</TableCell>
              <TableCell>
                {item.DATA ? new Date(item.DATA).toLocaleDateString() : "N/A"}
              </TableCell>
              <TableCell>
                {item.VALOR
                  ? Math.abs(parseFloat(item.VALOR.toString())).toLocaleString(
                      "pt-BR",
                      {
                        style: "currency",
                        currency: "BRL",
                        minimumFractionDigits: 2,
                      },
                    )
                  : "R$ 0,00"}
              </TableCell>
              <TableCell>
                {Number(item.VALOR) > 0 ? "Receita" : "Despesa"}
              </TableCell>
              <TableCell>
                <Button>
                  <Link
                    href={`./dashboard/photo/${item.ID_LANCAMENTO}`}
                    target="_blank"
                  >
                    Recibos
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
