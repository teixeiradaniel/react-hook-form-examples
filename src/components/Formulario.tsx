// @ts-ignore
import React, {useEffect} from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {ReactComponent as Man} from "../images/man.svg";
import {ReactComponent as Woman} from "../images/woman.svg";

type FormValues = {
    "nome": string;
    "telefone": number;
    "genero": string;
    "nacionalidade": string;
    "cpf": number | undefined;
    "rne": number | undefined;
};

function Formulario() {

    const form = useForm<FormValues>({
        defaultValues: {
            nacionalidade: 'brasil'
        }
    });







    const onSubmit: SubmitHandler<FormValues> = (data) => {
        // form.handleSubmit()
        alert(
            'Cadastrado com sucesso!\n'+
            'Nome: ' + data.nome + '\n'+
            'Telefone: ' + data.telefone + '\n'+
            'Gênero: ' + data.genero + '\n'+
            'Nacionalidade: ' + data.nacionalidade + '\n'+
            'CPF: ' + data.cpf + '\n'+
            'RNE: ' + data.rne
        );
    };






    const setValues = () => {
        form.setValue('nome', 'Platão');
    }






    const setValuesAndValidate = () => {
        form.setValue('nome', 'Sócrates', { shouldValidate: true });
    }






    const resetNacionalidade = () => {
        form.setValue('nacionalidade', '');
    }







    const triggerNacionalidade = () => {
        form.trigger('nacionalidade');
    }






    const resetDocumento = () => {
        if (nacionalidade === 'brasil') {
            form.setValue('cpf', undefined);
        } else {
            form.setValue('rne', undefined);
        }
    }

    const triggerDocumento = () => {
        if (nacionalidade === 'brasil') {
            form.trigger('cpf');
        } else {
            form.trigger('rne');
        }
    }






    const nacionalidade = form.watch('nacionalidade');

    useEffect(() => {
        handleNacionalidadeChange(nacionalidade);
    }, [nacionalidade]);

    const handleNacionalidadeChange = (value: string) => {
        if (value === 'brasil') {
            form.unregister('rne');
        } else if (value === 'estrangeiro') {
            form.unregister('cpf');
        } else {
            form.unregister('cpf');
            form.unregister('rne');
        }
    };






    const resetForm = () => {
        form.reset();
    }




    const errors = form.formState.errors;
    const formDirty = form.formState.isDirty;
    // useEffect(() => {
    //     if (formDirty) form.trigger();
    // }, [formDirty]);

    // const dirtyFields = form.formState.dirtyFields;
    // const touchedFields = form.formState.touchedFields;
    return (
        <div>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="nome" className="form-label">Nome:</label>
                    <input {...form.register('nome', { required: 'Campo nome é obrigatório' })} className={`form-control ${errors.nome ? 'is-invalid' : ''}`} />
                    {errors.nome && <div className="invalid-feedback">{errors.nome.message}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="telefone" className="form-label">Telefone:</label>
                    <input {...form.register('telefone', { required: 'Este campo é obrigatório' })} type="number" className={`form-control ${errors.telefone ? 'is-invalid' : ''}`} />
                    {errors.telefone && <div className="invalid-feedback">{errors.telefone.message}</div>}
                </div>

                <div className="mb-3">

                    <label className="form-label">Gênero</label>
                    <div className="form-check">
                        <input {...form.register('genero', { required: 'Selecione o gênero' })} type="radio" className={`form-check-input ${errors.genero ? 'is-invalid' : ''}`} value="masculino" />
                        <label className="form-check-label">Masculino <Man/></label>
                    </div>
                    <div className="form-check">
                        <input {...form.register('genero', { required: 'Selecione o gênero' })} type="radio" className={`form-check-input ${errors.genero ? 'is-invalid' : ''}`} value="feminino" />
                        <label className="form-check-label">Feminino <Woman/></label>
                    </div>
                    {errors.genero && (<><div className={`${errors.genero ? 'is-invalid' : ''}`}></div><div className="invalid-feedback">{errors.genero?.message}</div></>)}
                </div>

                <div className="mb-3">
                    <label htmlFor="nacionalidade" className="form-label">Nacionalidade:</label>
                    <select {...form.register('nacionalidade', { required: 'Selecione a nacionalidade' })}
                            className={`form-select ${errors.nacionalidade ? 'is-invalid' : ''}`}
                             >
                        <option value="">Selecione...</option>
                        <option value="brasil">Brasil</option>
                        <option value="estrangeiro">Estrangeiro</option>
                    </select>
                    {errors.nacionalidade && <div className="invalid-feedback">{errors.nacionalidade.message}</div>}
                </div>

                { nacionalidade === 'brasil' && (
                    <div className="mb-3">
                        <label htmlFor="cpf" className="form-label">CPF:</label>
                        <input {...form.register('cpf', { required: 'Este campo é obrigatório' })} type="number" className={`form-control ${errors.cpf ? 'is-invalid' : ''}`} />
                        {errors.cpf && <div className="invalid-feedback">{errors.cpf.message}</div>}
                    </div>
                )}

                { nacionalidade === 'estrangeiro' && (
                    <div className="mb-3">
                        <label htmlFor="rne" className="form-label">RNE:</label>
                        <input {...form.register('rne', { required: 'Este campo é obrigatório' })} type="number" className={`form-control ${errors.rne ? 'is-invalid' : ''}`} />
                        {errors.rne && <div className="invalid-feedback">{errors.rne.message}</div>}
                    </div>
                )}
                <button type="submit" className="btn btn-primary">Enviar</button>
                <button type="button" className="btn btn-secondary" onClick={setValues}>Preencher Nome</button>
                <button type="button" className="btn btn-secondary" onClick={setValuesAndValidate}>Preencher e Validar Nome</button>
                <button type="button" className="btn btn-secondary" onClick={resetNacionalidade}>Limpar Nacionalidade</button>
                <button type="button" className="btn btn-secondary" onClick={triggerNacionalidade}>Validar Nacionalidade</button>

                {nacionalidade && (
                <>
                    <button type="button" className="btn btn-secondary" onClick={resetDocumento}>Limpar {nacionalidade === 'brasil' ? 'CPF' : 'RNE'}</button>
                    <button type="button" className="btn btn-secondary" onClick={triggerDocumento}>Validar {nacionalidade === 'brasil' ? 'CPF' : 'RNE'}</button>
                </>
                )}

                <button type="button" className="btn btn-secondary" onClick={resetForm}>Resetar Formulário</button>
            </form>
            <button className="btn btn-warning" onClick={() => window.location.href = '/formulario-avancado'}>Ir para Formulário avançado</button>
            <button className="btn btn-link" onClick={() => window.location.href = '/'}>Voltar a página inicial</button>
            <pre style={{overflow: 'scroll', marginTop: '50px', height: '200px'}}>
                formDirty = {JSON.stringify(formDirty, null, 2)}
            </pre>
        </div>
    );
};

export default Formulario;
