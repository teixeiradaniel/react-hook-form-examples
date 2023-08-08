import React from 'react';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';

type FormValues = {
    items: { chave: string; valor: string }[];
    novaLista: { chave: string; valor: string }[];
};

function FormularioAvancado() {
    const defaultValues = [
        { chave: 'HOST', valor: 'localhost' },
        { chave: 'PORT', valor: '5432' },
        { chave: 'USER', valor: 'postgres' },
        { chave: 'PASS', valor: '' }
    ];

    const {
        control,
        register,
        reset,
        trigger,
        getValues,
        handleSubmit,
        formState: { errors }
    } = useForm<FormValues>({
        defaultValues: {
            items: defaultValues
        }
    });

    const {
        control: form2Control,
        register: form2Register,
        reset: form2Reset,
        trigger: form2Trigger,
        getValues: form2GetValues,
        handleSubmit: form2handleSubmit,
        formState: { errors: form2Errors }
    } = useForm<FormValues>({
        defaultValues: {
            items: defaultValues
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'items'
    });

    const { fields: fieldsNovaLista, append: adicionarNovaLista, remove: removerNovaLista } = useFieldArray({
        control,
        name: 'novaLista'
    });





    const isDuplicateKey = (chave: string, index: number) => {
        const keys = fields.map((item, i) => (i === index ? chave : item.chave));
        return keys.indexOf(chave) !== keys.lastIndexOf(chave);
    };







    const onBlurChave = async (chave: string, index: number) => {
        await trigger(`items.${index}.chave`);
    };






    const resetItem = (index: number) => {
        const currentValues = getValues();
        const itemsCopy = [...currentValues.items];
        const defaultValueIndex = defaultValues.findIndex((item) => item.chave === itemsCopy[index].chave);

        if (defaultValueIndex === -1) return;

        itemsCopy[index] = { ...itemsCopy[index], valor: defaultValues[defaultValueIndex].valor };
        reset({ items: itemsCopy });
    }

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        alert('Enviado com sucesso:\n' + JSON.stringify(data, null, 2));
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {fields.map((field, index) => (
                    <div key={field.id} className="row mb-3">
                        <div className="col">
                            <input
                                type="text"
                                disabled={['HOST', 'PORT', 'USER', 'PASS'].some((item) => item === field.chave) && !errors.items?.[index]?.chave}
                                className={`form-control ${errors.items?.[index]?.chave ? 'is-invalid' : ''}`}
                                {...register(`items.${index}.chave`, {
                                    required: 'Este campo é obrigatório',
                                    validate: (value) =>
                                        isDuplicateKey(value, index) ? 'Não são permitidas chaves duplicadas' : true
                                })}
                                onBlur={(e) => onBlurChave(e.target.value, index)}
                                placeholder="Chave"
                            />
                            {errors.items?.[index]?.chave && <div className="invalid-feedback">{errors.items[index]?.chave?.message}</div>}
                        </div>
                        <div className="col">
                            <input
                                type="text"
                                className={`form-control ${errors.items?.[index]?.valor ? 'is-invalid' : ''}`}
                                {...register(`items.${index}.valor`, { required: 'Este campo é obrigatório' })}
                                placeholder="Valor"
                            />
                            {errors.items?.[index]?.valor && <div className="invalid-feedback">{errors.items[index]?.valor?.message}</div>}
                        </div>
                        <div className="col-auto">
                            {['HOST', 'PORT', 'USER', 'PASS'].some((item) => item === field.chave) && !errors.items?.[index]?.chave ? (
                                <button type="button" className="btn btn-warning" onClick={() => resetItem(index)}>
                                    Resetar
                                </button>
                            ) : (
                                <button type="button" className="btn btn-danger" onClick={() => remove(index)}>
                                    Remover
                                </button>
                            )}

                        </div>
                    </div>
                ))}

                <button type="button" className="btn btn-secondary" onClick={() => append({ chave: '', valor: '' })}>Adicionar Novo Item</button>
                <button type="submit" className="btn btn-primary">Enviar</button>

            </form>
            <button className="btn btn-info" onClick={() => window.location.href = '/formulario'}>Ir para Formulário padrão</button>
            <button className="btn btn-link" onClick={() => window.location.href = '/'}>Voltar a página inicial</button>
            {/*<pre style={{overflow: 'scroll', marginTop: '50px', height: '200px'}}>*/}
            {/*    getValues() = {JSON.stringify(getValues(), null, 2)}*/}
            {/*</pre>*/}
        </div>
    );
};

export default FormularioAvancado;