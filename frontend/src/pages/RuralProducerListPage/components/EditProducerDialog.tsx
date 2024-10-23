import {useEffect} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Checkbox} from "@/components/ui/checkbox";
import {Producer} from "@/types/producer";
import {CULTURES, STATES} from "@/constants/producer";
import {validateCpfCnpj} from '@/utils/validators';

interface EditProducerDialogProps {
  producer: Producer | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Producer) => Promise<void>;
  isLoading: boolean;
}

export function EditProducerDialog({
                                     producer,
                                     open,
                                     onOpenChange,
                                     onSubmit,
                                     isLoading
                                   }: EditProducerDialogProps) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    reset,
  } = useForm<Producer>();

  useEffect(() => {
    if (producer) {
      reset({
        cpfCnpj: producer.cpfCnpj,
        name: producer.name,
        farmName: producer.farmName,
        city: producer.city,
        state: producer.state,
        totalArea: producer.totalArea,
        arableLand: producer.arableLand,
        vegetationArea: producer.vegetationArea,
        crops: producer.crops
      });
    }
  }, [producer, reset]);

  const totalArea = watch('totalArea', 0);
  const arableLand = watch('arableLand', 0);
  const vegetationArea = watch('vegetationArea', 0);

  if (!producer) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Editar Produtor</DialogTitle>
            <DialogDescription>
              Faça as alterações necessárias nos dados do produtor
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* CPF/CNPJ */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cpfCnpj" className="text-right">CPF/CNPJ</Label>
              <div className="col-span-3">
                <Input
                  id="cpfCnpj"
                  {...register("cpfCnpj", {
                    required: "CPF/CNPJ é obrigatório",
                    validate: value => validateCpfCnpj(value) || "CPF/CNPJ inválido"
                  })}
                />
                {errors.cpfCnpj && (
                  <span className="text-sm text-red-500">{errors.cpfCnpj.message}</span>
                )}
              </div>
            </div>

            {/* Nome */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Nome</Label>
              <div className="col-span-3">
                <Input
                  id="name"
                  {...register("name", { required: "Nome é obrigatório" })}
                />
                {errors.name && (
                  <span className="text-sm text-red-500">{errors.name.message}</span>
                )}
              </div>
            </div>

            {/* Nome da Fazenda */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="farmName" className="text-right">Nome da Fazenda</Label>
              <div className="col-span-3">
                <Input
                  id="farmName"
                  {...register("farmName", { required: "Nome da fazenda é obrigatório" })}
                />
                {errors.farmName && (
                  <span className="text-sm text-red-500">{errors.farmName.message}</span>
                )}
              </div>
            </div>

            {/* Cidade */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="city" className="text-right">Cidade</Label>
              <div className="col-span-3">
                <Input
                  id="city"
                  {...register("city", { required: "Cidade é obrigatória" })}
                />
                {errors.city && (
                  <span className="text-sm text-red-500">{errors.city.message}</span>
                )}
              </div>
            </div>

            {/* Estado */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="state" className="text-right">Estado</Label>
              <div className="col-span-3">
                <Controller
                  name="state"
                  control={control}
                  rules={{ required: "Estado é obrigatório" }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o estado" />
                      </SelectTrigger>
                      <SelectContent>
                        {STATES.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.state && (
                  <span className="text-sm text-red-500">{errors.state.message}</span>
                )}
              </div>
            </div>

            {/* Área Total */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="totalArea" className="text-right">Área Total (ha)</Label>
              <div className="col-span-3">
                <Input
                  id="totalArea"
                  type="number"
                  step="any"
                  {...register("totalArea", {
                    required: "Área total é obrigatória",
                    min: { value: 0, message: "Área deve ser maior que 0" },
                    valueAsNumber: true
                  })}
                />
                {errors.totalArea && (
                  <span className="text-sm text-red-500">{errors.totalArea.message}</span>
                )}
              </div>
            </div>

            {/* Área Agricultável */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="arableLand" className="text-right">Área Agricultável (ha)</Label>
              <div className="col-span-3">
                <Input
                  id="arableLand"
                  type="number"
                  step="any"
                  {...register("arableLand", {
                    required: "Área agricultável é obrigatória",
                    min: { value: 0, message: "Área deve ser maior que 0" },
                    valueAsNumber: true,
                    validate: value =>
                      (value + Number(vegetationArea)) <= Number(totalArea) ||
                      "A soma das áreas não pode ser maior que a área total"
                  })}
                />
                {errors.arableLand && (
                  <span className="text-sm text-red-500">{errors.arableLand.message}</span>
                )}
              </div>
            </div>

            {/* Área de Vegetação */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="vegetationArea" className="text-right">Área de Vegetação (ha)</Label>
              <div className="col-span-3">
                <Input
                  id="vegetationArea"
                  type="number"
                  step="any"
                  {...register("vegetationArea", {
                    required: "Área de vegetação é obrigatória",
                    min: { value: 0, message: "Área deve ser maior que 0" },
                    valueAsNumber: true,
                    validate: value =>
                      (value + Number(arableLand)) <= Number(totalArea) ||
                      "A soma das áreas não pode ser maior que a área total"
                  })}
                />
                {errors.vegetationArea && (
                  <span className="text-sm text-red-500">{errors.vegetationArea.message}</span>
                )}
              </div>
            </div>

            {/* Culturas */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Culturas</Label>
              <div className="col-span-3 space-y-2">
                <Controller
                  name="crops"
                  control={control}
                  rules={{ required: "Selecione pelo menos uma cultura" }}
                  render={({ field }) => (
                    <div className="grid grid-cols-2 gap-2">
                      {CULTURES.map((culture) => (
                        <div key={culture} className="flex items-center space-x-2">
                          <Checkbox
                            checked={field.value?.includes(culture)}
                            onCheckedChange={(checked) => {
                              const newValue = checked
                                ? [...(field.value || []), culture]
                                : field.value?.filter((val) => val !== culture) || [];
                              field.onChange(newValue);
                            }}
                          />
                          <label>{culture}</label>
                        </div>
                      ))}
                    </div>
                  )}
                />
                {errors.crops && (
                  <span className="text-sm text-red-500">{errors.crops.message}</span>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Salvando..." : "Salvar alterações"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}