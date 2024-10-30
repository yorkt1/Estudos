import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './Adm.css';
import prod_foto from '../assets/prod-foto.png';
import search_icon_light from '../assets/search_w.png';
import search_icon_dark from '../assets/search_b.png';

const App = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [nome, setNome] = useState('');
    const [categoria, setCategoria] = useState('');
    const [descricao, setDescricao] = useState('');
    const [tamanho, setTamanho] = useState('');
    const [imagem, setImagem] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [produtoEncontrado, setProdutoEncontrado] = useState(null);
    const movableDivRef = useRef(null);
    const leftContainerRef = useRef(null);
    const rightContainerRef = useRef(null);

    useEffect(() => {
        if (movableDivRef.current) {
            movableDivRef.current.classList.add('move-right');
            if (leftContainerRef.current) {
                leftContainerRef.current.classList.add('move-right-container');
            }
            if (rightContainerRef.current) {
                rightContainerRef.current.classList.add('move-right-container');
            }
        }
    }, []);


    const handleCadastrarA = async () => {
        if (movableDivRef.current) {
            movableDivRef.current.classList.remove('move-right');
        }
        if (leftContainerRef.current) {
            leftContainerRef.current.classList.remove('move-right-container');
        }
        if (rightContainerRef.current) {
            rightContainerRef.current.classList.remove('move-right-container');
        }
        setIsEditing(false);

       
    };


    const handleEditarB = () => {
        if (movableDivRef.current) {
            movableDivRef.current.classList.add('move-right');
        }
        if (leftContainerRef.current) {
            leftContainerRef.current.classList.add('move-right-container');
        }
        if (rightContainerRef.current) {
            rightContainerRef.current.classList.add('move-right-container');
        }
        setIsEditing(true);
    };


    const handleCadastrar = async () => {
  
        const novoProduto = {
            nome,
            categoria,
            descricao,
            tamanho,
            imagem: imagem ? URL.createObjectURL(imagem) : prod_foto,
        };

        if (!nome || !categoria) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        try {
            await axios.post(`http://localhost:8080/${categoria.toLowerCase()}`, novoProduto);
            alert('Produto cadastrado com sucesso!');
            resetFields();
        } catch (error) {
            console.error(error);
            alert('Erro ao cadastrar o produto.');
        }
    };

    const handleSearch = async () => {
        if (!searchTerm) {
            alert('Por favor, insira o nome do produto.');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:8080/${categoria.toLowerCase()}?nome=${encodeURIComponent(searchTerm)}`);
            const produtosLocalizados = response.data;

            if (!produtosLocalizados || produtosLocalizados.length === 0) {
                alert('Produto não encontrado.');
                return;
            }

            const produto = produtosLocalizados.find(p => p.nome.toLowerCase() === searchTerm.toLowerCase());
            if (!produto) {
                alert('Produto não encontrado.');
                return;
            }

            setProdutoEncontrado(produto);
            setNome(produto.nome);
            setCategoria(produto.categoria);
            setDescricao(produto.descricao);
            setTamanho(produto.tamanho);
            setImagem(null);
        } catch (error) {
            console.error('Erro ao buscar o produto:', error);
            alert('Erro ao buscar o produto.');
        }
    };

    const handleEdit = async () => {
        if (!produtoEncontrado) {
            alert('Nenhum produto selecionado para edição.');
            return;
        }

        const novoProduto = {
            nome,
            categoria,
            descricao,
            tamanho,
            imagem: imagem ? URL.createObjectURL(imagem) : prod_foto,
        };

        try {
            await axios.put(`http://localhost:8080/${categoria.toLowerCase()}/${produtoEncontrado.id}`, novoProduto);
            alert('Produto editado com sucesso!');
            resetFields();
        } catch (error) {
            console.error('Erro ao editar o produto:', error);
            alert('Erro ao editar o produto.');
        }
    };

    const handleDelete = async () => {
        if (!produtoEncontrado) {
            alert('Nenhum produto selecionado para exclusão.');
            return;
        }

        try {
            await axios.delete(`http://localhost:8080/${categoria.toLowerCase()}/${produtoEncontrado.id}`);
            alert('Produto excluído com sucesso!');
            resetFields();
        } catch (error) {
            console.error('Erro ao excluir o produto:', error);
            alert('Erro ao excluir o produto.');
        }
    };

    const resetFields = () => {
        setNome('');
        setCategoria('');
        setDescricao('');
        setTamanho('');
        setImagem(null);
        setProdutoEncontrado(null);
    };

    const handleEditar = () => {
        if (movableDivRef.current) {
            movableDivRef.current.classList.add('move-right');
        }
        if (leftContainerRef.current) {
            leftContainerRef.current.classList.add('move-right-container');
        }
        if (rightContainerRef.current) {
            rightContainerRef.current.classList.add('move-right-container');
        }
        setIsEditing(true);
    };

    return (
        <div>
            <header></header>
            <div className="ConteinerPrincipal">
                <div className="conteinerCentral">
                    <div className="painelfoto">
                        <div className="foto-adm">
                            <img  alt="Administrador" />
                        </div>
                        <p>Olá Administrador</p>
                    </div>
                    <div className="Informacao-Adm">
                        <div className={`container-mid ${isEditing ? 'editing' : 'registering'}`}>
                            <div className={`movable-div ${isEditing ? 'move-right' : ''}`} ref={movableDivRef}>
                                <img src={prod_foto} alt="Produto" />
                            </div>

                            <div className="left-container" ref={leftContainerRef}>
                                <select className="input-adm-css" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                                    <option value="" disabled>Selecione a categoria do Produto</option>
                                    <option value="Arranjos">Arranjos</option>
                                    <option value="Desidratadas">Desidratadas</option>
                                    <option value="Orquideas">Orquídeas</option>
                                    <option value="Plantas">Plantas</option>
                                </select>
                                <FormInput id="name" label="Nome" type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                                <FormInput id="description" label="Descrição" type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                                <FormInput id="size" label="Tamanho" type="text" value={tamanho} onChange={(e) => setTamanho(e.target.value)} />
                                <input type="file" className="input-adm-css" onChange={(e) => setImagem(e.target.files[0])} />
                                <div className="btn">
                                    <button className="btn-css-cadastrar" onClick={handleCadastrar}>CADASTRAR</button>
                                </div>
                            </div>

                            <div className="right-container" ref={rightContainerRef}>
                                <div className="search-box-prod">
                                    <input className="input-adm-css" type="text" placeholder="Procurar" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                                    <button onClick={handleSearch}>
                                        <img className="icon-search" src={search_icon_light} alt="Search" />
                                    </button>
                                </div>
                                <select className="input-adm-css" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                                    <option value="" disabled>Selecione a categoria do Produto</option>
                                    <option value="Arranjos">Arranjos</option>
                                    <option value="Desidratadas">Desidratadas</option>
                                    <option value="Orquideas">Orquídeas</option>
                                    <option value="Plantas">Plantas</option>
                                </select>
                                <FormInput id="edit-name" label="Nome" type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                                <FormInput id="edit-description" label="Descrição" type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                                <FormInput id="edit-size" label="Tamanho" type="text" value={tamanho} onChange={(e) => setTamanho(e.target.value)} />
                                <div className="btn">
                                    <button className="btn-css" onClick={handleEdit}>EDITAR</button>
                                    <button className="btn-css-excluir" onClick={handleDelete}>EXCLUIR</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container-button">
                        <button className="btn-css-buttom" onClick={handleCadastrarA}>CADASTRAR PRODUTO</button>
                        <button className="btn-css-buttom" onClick={handleEditarB}>EDITAR PRODUTO</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const FormInput = ({ id, label, type, value, onChange }) => {
    return (
        <div className="form-item">
            <input type={type} id={id} value={value} onChange={onChange} autoComplete="off" required />
            <label htmlFor={id}>{label}</label>
        </div>
    );
};

export default App;
