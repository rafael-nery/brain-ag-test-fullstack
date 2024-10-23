// src/components/producer/ItemDropdownMenu.tsx
import React, {useState} from 'react';
import axios from 'axios';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {DotsHorizontalIcon} from "@radix-ui/react-icons";
import {useToast} from "@/hooks/use-toast";
import {Producer} from '@/types/producer';
import {ViewProducerDialog} from './ViewProducerDialog';
import {EditProducerDialog} from './EditProducerDialog';
import {DeleteProducerDialog} from './DeleteProducerDialog';

interface Props {
  id: string;
  onAction: () => void;
}

export function ItemDropdownMenu({ id, onAction }: Props) {
  const [producer, setProducer] = useState<Producer | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchProducer = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/api/producers/${id}`);
      setProducer(response.data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Erro ao carregar dados do produtor",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (data: Producer) => {
    try {
      setIsLoading(true);
      const formattedData = {
        ...data,
        totalArea: Number(data.totalArea),
        arableLand: Number(data.arableLand),
        vegetationArea: Number(data.vegetationArea)
      };

      await axios.put(`/api/producers/${id}`, formattedData);
      toast({
        title: "Sucesso",
        description: "Produtor atualizado com sucesso",
      });
      setIsEditOpen(false);
      onAction();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Erro ao atualizar produtor",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/producers/${id}`);
      toast({
        title: "Sucesso",
        description: "Produtor excluído com sucesso",
      });
      setIsDeleteOpen(false);
      onAction();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Erro ao excluir produtor",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir menu</span>
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => navigator.clipboard.writeText(id)}>
            Copiar ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => { fetchProducer(); setIsViewOpen(true); }}>
            Visualizar produtor
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => { fetchProducer(); setIsEditOpen(true); }}>
            Editar produtor
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setIsDeleteOpen(true)}
            className="text-red-600 focus:text-red-600"
          >
            Excluir produtor
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ViewProducerDialog
        producer={producer}
        open={isViewOpen}
        onOpenChange={setIsViewOpen}
      />

      <EditProducerDialog
        producer={producer}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        onSubmit={handleUpdate}
        isLoading={isLoading}
      />

      <DeleteProducerDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={handleDelete}
        isLoading={isLoading}
      />
    </>
  );
}