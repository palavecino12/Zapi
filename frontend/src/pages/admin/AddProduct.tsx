import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Header from '../../components/Header';
import { CameraView } from '../../scanner/CameraView';
import { Button } from '../../components/Button';
import { Imput } from '../../components/Imput';
import type { CreateProductDTO } from '../../types/productType';
import { createProductSchema } from '../../schemas/product.schema';
import { useCreateProduct } from '../../hooks/useCreateProduct';
import { Loading } from '../../components/feedback/Loading';
import { ErrorModal } from '../../components/feedback/ErrorModal';
import { useNavigate } from 'react-router-dom';

export function AddProduct() {

  const navigate = useNavigate()
  const { addProduct, error, loading } = useCreateProduct()
  const { register, handleSubmit, setValue, control, formState: { errors, isSubmitting } } = useForm<CreateProductDTO>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      code: '',
      name: '',
      category: '',
    },
  });

  const code = useWatch({ control, name: 'code' });
  const [existingCode, setExistingCode] = useState<string | null>(null);

  //Funcion para validar el codigo leido
  const handleCode = (scanned: string, existProduct: boolean) => {
    if (existProduct) {
      // Ya está cargado: no dejamos el código en el form
      setValue('code', '');
      setExistingCode(scanned);
      return;
    }
    setExistingCode(null);
    setValue('code', scanned, { shouldValidate: true });
  };

  //Funcion para crear el producto
  const onSubmit = async (data: CreateProductDTO) => {
    const newProduct = await addProduct(data)
    if (!newProduct) return //el error ya se muestra en el ErrorModal

    navigate('/success', {
      state: {
        text: `"${newProduct.name}" se almacenó correctamente.`,
        redirectTo: '/admin/products',
      },
    })
  };

  return (
    <>
      {/* Componente loading */}
      {loading && <Loading />}

      <div className="flex flex-col h-screen bg-white">
        <Header title="Carga de producto" />

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex-1 overflow-y-auto px-5 py-5"
        >
          {/* Cámara */}
          <div className="flex items-center justify-center mb-4 overflow-hidden">
            <CameraView mode="admin" onScanCode={handleCode} />
          </div>

          {/* Código escaneado */}
          <input type="hidden" {...register('code')} />

          <div
            className={`w-full rounded-lg py-2 font-medium flex justify-center ${existingCode
              ? 'bg-red-600 text-white'
              : code
                ? 'bg-green-600 text-white'
                : 'border border-gray-300 text-gray-500'
              }`}
          >
            {existingCode
              ? 'Este producto ya está almacenado'
              : code || <p className='text-sm text-black/40'>Escaneá el producto</p>}
          </div>

          {errors.code && !existingCode && (
            <p className="text-red-500 text-xs mt-1">
              {errors.code.message}
            </p>
          )}


          {/* Campos */}
          <div className="flex flex-col gap-4 mt-5">
            <Imput
              label="Nombre"
              placeholder="Nombre del producto"
              error={errors.name?.message}
              {...register('name')}
            />

            <Imput
              label="Categoría"
              placeholder="Categoría"
              error={errors.category?.message}
              {...register('category')}
            />

            <Imput
              label="Precio"
              type="number"
              step="0.01"
              placeholder="Precio ($)"
              error={errors.price?.message}
              {...register('price', { valueAsNumber: true })}
            />

            <Imput
              label="Stock"
              type="number"
              step="1"
              placeholder="Cantidad inicial"
              error={errors.stock?.message}
              {...register('stock', { valueAsNumber: true })}
            />
          </div>

          <div className="mt-6 flex justify-center">
            <Button type="submit" disabled={isSubmitting}>
              Almacenar
            </Button>
          </div>
        </form>
      </div>

      {/* Modal para advetir de un problema no mayor */}
      <ErrorModal error={error} />
    </>

  );
}