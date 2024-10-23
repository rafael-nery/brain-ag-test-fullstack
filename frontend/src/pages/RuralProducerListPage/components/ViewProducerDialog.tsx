import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Producer} from "@/types/producer";

interface ViewProducerDialogProps {
  producer: Producer | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ViewProducerDialog({ producer, open, onOpenChange }: ViewProducerDialogProps) {
  if (!producer) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Detalhes do Produtor</DialogTitle>
          <DialogDescription>
            Informações completas do produtor
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right font-bold">CPF/CNPJ</Label>
            <div className="col-span-3">{producer.cpfCnpj}</div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right font-bold">Nome</Label>
            <div className="col-span-3">{producer.name}</div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right font-bold">Fazenda</Label>
            <div className="col-span-3">{producer.farmName}</div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right font-bold">Cidade/UF</Label>
            <div className="col-span-3">{producer.city}/{producer.state}</div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right font-bold">Áreas (ha)</Label>
            <div className="col-span-3">
              <div>Total: {producer.totalArea}</div>
              <div>Cultivável: {producer.arableLand}</div>
              <div>Vegetação: {producer.vegetationArea}</div>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right font-bold">Culturas</Label>
            <div className="col-span-3">{producer.crops.join(", ")}</div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right font-bold">Cadastrado em</Label>
            <div className="col-span-3">
              {new Date(producer.createdAt).toLocaleDateString('pt-BR')}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}