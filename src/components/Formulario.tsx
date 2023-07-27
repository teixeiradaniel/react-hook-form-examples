// @ts-ignore
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type FormData = {
    nome: string;
    telefone: number;
    sexo: 'masculino' | 'feminino';
    nacionalidade: 'brasil' | 'estrangeiro';
};

function Formulario() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Nome:</label>
                <input {...register('nome', { required: 'Este campo é obrigatório' })} />
                {errors.nome && <span>{errors.nome.message}</span>}
            </div>

            <div>
                <label>Telefone:</label>
                <input {...register('telefone', { required: 'Este campo é obrigatório' })} type="number" />
                {errors.telefone && <span>{errors.telefone.message}</span>}
            </div>

            <div>
                <label>Sexo:</label>
                <label>
                    <input {...register('sexo', { required: 'Selecione o sexo' })} type="radio" value="masculino" /> Masculino
                </label>
                <label>
                    <input {...register('sexo', { required: 'Selecione o sexo' })} type="radio" value="feminino" /> Feminino
                </label>
                {errors.sexo && <span>{errors.sexo.message}</span>}
            </div>

            <div>
                <label>Nacionalidade:</label>
                <select {...register('nacionalidade', { required: 'Selecione a nacionalidade' })}>
                    <option value="">Selecione...</option>
                    <option value="brasil">Brasil</option>
                    <option value="estrangeiro">Estrangeiro</option>
                </select>
                {errors.nacionalidade && <span>{errors.nacionalidade.message}</span>}
            </div>

            <button type="submit">Enviar</button>
        </form>
    );
};

export default Formulario;
