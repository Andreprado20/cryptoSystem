"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_BASE_URL = "https://crypto-system-backend-jn7vgtrlu.vercel.app/api";

type Entity = "usuarios" | "carteiras" | "criptoativos" | "historico_transacao" | "transacao" ;

interface FormData {
  [key: string]: string | number;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<Entity>("usuarios");
  const [data, setData] = useState<any[]>([]);
  const [formData, setFormData] = useState<FormData>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData(activeTab);
  }, [activeTab]);

  const fetchData = async (entity: Entity) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/${entity}`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error(`Failed to fetch ${entity} data. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isEditing) {
        await axios.put(`${API_BASE_URL}/${activeTab}/${editId}`, formData);
        toast.success("Item updated successfully!");
      } else {
        await axios.post(`${API_BASE_URL}/${activeTab}`, formData);
        toast.success("Item created successfully!");
      }
      fetchData(activeTab);
      setIsDialogOpen(false);
      setFormData({});
      setIsEditing(false);
      setEditId(null);
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Failed to submit data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    setIsLoading(true);
    try {
      await axios.delete(`${API_BASE_URL}/${activeTab}/${id}`);
      toast.success("Item deleted successfully!");
      fetchData(activeTab);
    } catch (error) {
      console.error("Error deleting data:", error);
      toast.error("Failed to delete item. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (item: any) => {
    setFormData(item);
    setIsEditing(true);
    setEditId(item.id);
    setIsDialogOpen(true);
  };

  const renderForm = () => {
    const fields: { [key in Entity]: string[] } = {
      usuarios: ["nome", "login", "senha"],
      carteiras: ["nome", "id_usuario"],
      criptoativos: ["nome", "codigo", "preco"],
      historico_transacao: ["id_carteira", "id_criptoativo", "quantidade"],
      transacao: ["id_carteira_origem", "id_carteira_destino", "id_criptoativo", "quantidade", "tipo"],
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        {fields[activeTab].map((field) => (
          <div key={field}>
            <Label htmlFor={field}>{field}</Label>
            {field === "tipo" && activeTab === "transacao" ? (
              <Select
                value={formData[field] as string}
                onValueChange={(value) => setFormData({ ...formData, [field]: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select transaction type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="compra">Compra</SelectItem>
                  <SelectItem value="venda">Venda</SelectItem>
                  <SelectItem value="transferencia">Transferência</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <Input
                id={field}
                type={field === "senha" ? "password" : "text"}
                value={formData[field] || ""}
                onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                required
              />
            )}
          </div>
        ))}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Processing..." : (isEditing ? "Update" : "Create")}
        </Button>
      </form>
    );
  };

  const renderTable = () => {
    if (isLoading) return <p>Loading...</p>;
    if (data.length === 0) return <p>No data available.</p>;

    const columns = Object.keys(data[0]);

    return (
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column}>{column}</TableHead>
            ))}
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell key={column}>{item[column]}</TableCell>
              ))}
              <TableCell>
                <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(item.id)}
                  className="ml-2"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Gerenciador de Carteira de Criptomoedas</h1>
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as Entity)}>
        <TabsList>
          <TabsTrigger value="usuarios">Usuários</TabsTrigger>
          <TabsTrigger value="carteiras">Carteiras</TabsTrigger>
          <TabsTrigger value="criptoativos">Criptoativos</TabsTrigger>
          <TabsTrigger value="historico_transacao">Histórico de Transações</TabsTrigger>
          <TabsTrigger value="transacao">Transações</TabsTrigger>          
        </TabsList>
        {["usuarios", "carteiras", "criptoativos", "historico_transacao", "transacao"].map((tab) => (
          <TabsContent key={tab} value={tab}>
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {tab !== "carteira_cripto" && (
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button onClick={() => {
                          setFormData({});
                          setIsEditing(false);
                          setEditId(null);
                        }}>
                          Novo
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{isEditing ? "Edit" : "Add New"} {tab.slice(0, -1)}</DialogTitle>
                        </DialogHeader>
                        {renderForm()}
                      </DialogContent>
                    </Dialog>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>{renderTable()}</CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
      <ToastContainer />
    </div>
  );
}