import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import axios from 'axios';
import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";
import {Checkbox} from "@/components/ui/checkbox";
import {validateCpfCnpj} from '@/utils/validators';
import {useToast} from "@/hooks/use-toast.ts";

interface Props {
  onAction: () => void;
}

interface FormData {
  cpfCnpj: string;
  name: string;
  farmName: string;
  city: string;
  state: string;
  totalArea: number;
  arableLand: number;
  vegetationArea: number;
  crops: string[];
}

const CULTURES = [
  'Soja',
  'Milho',
  'Algodão',
  'Café',
  'Cana de Açúcar'
];

const STATES = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

export function NewRuralProducer({ onAction }: Props) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    reset
  } = useForm<FormData>({
    defaultValues: {
      totalArea: 0,
      arableLand: 0,
      vegetationArea: 0,
      crops: []
    }
  });

  const totalArea = watch('totalArea', 0);
  const arableLand = watch('arableLand', 0);
  const vegetationArea = watch('vegetationArea', 0);

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      const formattedData = {
        ...data,
        totalArea: Number(data.totalArea),
        arableLand: Number(data.arableLand),
        vegetationArea: Number(data.vegetationArea)
      };

      await axios.post('/api/producers', formattedData);
      toast({
        title: "Sucesso",
        description: "Produtor cadastrado com sucesso",
      });
      reset();
      setOpen(false);
      onAction();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Erro ao cadastrar produtor",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="ml-4">
          Novo Produtor Rural
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Novo Produtor Rural</DialogTitle>
            <DialogDescription>
              Preencha os dados do novo produtor rural.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cpfCnpj" className="text-right">
                CPF/CNPJ
              </Label>
              <div className="col-span-3">
                <Input
                  id="cpfCnpj"
                  {...register("cpfCnpj", {
                    required: "CPF/CNPJ é obrigatório",
                    validate: (value) =>
                      validateCpfCnpj(value) || "CPF/CNPJ inválido"
                  })}
                />
                {errors.cpfCnpj && (
                  <span className="text-sm text-red-500">
                    {errors.cpfCnpj.message}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nome
              </Label>
              <div className="col-span-3">
                <Input
                  id="name"
                  {...register("name", { required: "Nome é obrigatório" })}
                />
                {errors.name && (
                  <span className="text-sm text-red-500">
                    {errors.name.message}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="farmName" className="text-right">
                Nome da Fazenda
              </Label>
              <div className="col-span-3">
                <Input
                  id="farmName"
                  {...register("farmName", { required: "Nome da fazenda é obrigatório" })}
                />
                {errors.farmName && (
                  <span className="text-sm text-red-500">
                    {errors.farmName.message}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="city" className="text-right">
                Cidade
              </Label>
              <div className="col-span-3">
                <Input
                  id="city"
                  {...register("city", { required: "Cidade é obrigatória" })}
                />
                {errors.city && (
                  <span className="text-sm text-red-500">
                    {errors.city.message}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="state" className="text-right">
                Estado
              </Label>
              <div className="col-span-3">
                <Controller
                  name="state"
                  control={control}
                  rules={{ required: "Estado é obrigatório" }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
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
                  <span className="text-sm text-red-500">
                    {errors.state.message}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="totalArea" className="text-right">
                Área Total (ha)
              </Label>
              <div className="col-span-3">
                <Input
                  id="totalArea"
                  type="number"
                  {...register("totalArea", {
                    required: "Área total é obrigatória",
                    min: { value: 0, message: "Área deve ser maior que 0" }
                  })}
                />
                {errors.totalArea && (
                  <span className="text-sm text-red-500">
                    {errors.totalArea.message}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="arableLand" className="text-right">
                Área Agricultável (ha)
              </Label>
              <div className="col-span-3">
                <Input
                  id="arableLand"
                  type="number"
                  {...register("arableLand", {
                    required: "Área agricultável é obrigatória",
                    min: { value: 0, message: "Área deve ser maior que 0" },
                    validate: value =>
                      (Number(value) + Number(vegetationArea)) <= Number(totalArea) ||
                      "A soma das áreas não pode ser maior que a área total"
                  })}
                />
                {errors.arableLand && (
                  <span className="text-sm text-red-500">
                    {errors.arableLand.message}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="vegetationArea" className="text-right">
                Área de Vegetação (ha)
              </Label>
              <div className="col-span-3">
                <Input
                  id="vegetationArea"
                  type="number"
                  {...register("vegetationArea", {
                    required: "Área de vegetação é obrigatória",
                    min: { value: 0, message: "Área deve ser maior que 0" },
                    validate: value =>
                      (Number(value) + Number(arableLand)) <= Number(totalArea) ||
                      "A soma das áreas não pode ser maior que a área total"
                  })}
                />
                {errors.vegetationArea && (
                  <span className="text-sm text-red-500">
                    {errors.vegetationArea.message}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">
                Culturas
              </Label>
              <div className="col-span-3 space-y-2">
                <Controller
                  name="crops"
                  control={control}
                  rules={{ required: "Selecione pelo menos uma cultura" }}
                  defaultValue={[]}
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
                  <span className="text-sm text-red-500">
                    {errors.crops.message}
                  </span>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}