import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { NeatGradient } from "@firecms/neat";
import * as THREE from 'three';
import LogoOficial from '../assets/LogoOficial.svg';

function Register() {
  const gradientRef = useRef(null);
  const neatInstanceRef = useRef(null);
  const [gradientLoaded, setGradientLoaded] = useState(false);
  const [form, setForm] = useState({ 
    nome: '', 
    email: '', 
    senha: '', 
    confirmarSenha: '' 
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const initGradient = async () => {
      console.log("Iniciando gradiente...");
      if (gradientRef.current && !neatInstanceRef.current) {
        try {
          console.log("Configurando gradiente...");
          const config = {
            colors: [
                {
                    color: '#005F73',
                    enabled: true,
                },
                {
                    color: '#0A9396',
                    enabled: true,
                },
                {
                    color: '#94D2BD',
                    enabled: true,
                },
                {
                    color: '#E9D8A6',
                    enabled: true,
                },
                {
                    color: '#EE9B00',
                    enabled: false,
                },
            ],
            speed: 3,
            horizontalPressure: 5,
            verticalPressure: 7,
            waveFrequencyX: 2,
            waveFrequencyY: 2,
            waveAmplitude: 8,
            shadows: 6,
            highlights: 8,
            colorBrightness: 1,
            colorSaturation: 7,
            wireframe: false,
            colorBlending: 10,
            backgroundColor: '#004E64',
            backgroundAlpha: 1,
            grainScale: 3,
            grainSparsity: 0,
            grainIntensity: 0.3,
            grainSpeed: 1,
            resolution: 1,
            yOffset: 0,
        };

          console.log("Criando instância do NeatGradient...");
          neatInstanceRef.current = new NeatGradient({
            ref: gradientRef.current,
            ...config
          });

          // Aguarda um momento para garantir que o gradiente foi inicializado
          await new Promise(resolve => setTimeout(resolve, 500));
          console.log("Gradiente inicializado com sucesso!");
          setGradientLoaded(true);
        } catch (error) {
          console.error('Erro detalhado ao inicializar NeatGradient:', error);
          setGradientLoaded(false);
        }
      }
    };

    initGradient();

    return () => {
      if (neatInstanceRef.current) {
        try {
          console.log("Destruindo instância do gradiente...");
          neatInstanceRef.current.destroy();
          neatInstanceRef.current = null;
          setGradientLoaded(false);
        } catch (error) {
          console.error('Erro ao destruir NeatGradient:', error);
        }
      }
    };
  }, []);

  function validateForm() {
    const newErrors = {};

    if (form.nome.trim().length < 3) {
      newErrors.nome = 'O nome deve ter pelo menos 3 caracteres';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      newErrors.email = 'Digite um email válido';
    }

    if (form.senha.length < 6) {
      newErrors.senha = 'A senha deve ter pelo menos 6 caracteres';
    }

    if (!/[A-Z]/.test(form.senha)) {
      newErrors.senha = 'A senha deve conter pelo menos uma letra maiúscula';
    }

    if (!/[0-9]/.test(form.senha)) {
      newErrors.senha = 'A senha deve conter pelo menos um número';
    }

    if (form.senha !== form.confirmarSenha) {
      newErrors.confirmarSenha = 'As senhas não coincidem';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8080/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: form.nome.trim(),
          email: form.email.trim(),
          senha: form.senha,
        })
      });

      if (!response.ok) {
        throw new Error('Erro ao cadastrar. Verifique os dados.');
      }

      // Usuário cadastrado com sucesso
      navigate('/login');
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <div className="flex min-h-screen">
      {/* Left pane */}
      <div className="w-[480px] bg-white p-12">
        <div className="mb-8">
          <img src={LogoOficial} alt="Logo" className="w-12 h-12" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">
                Nome
              </label>
              <input
                id="name"
                name="nome"
                type="text"
                required
                className="block w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#004E64]"
                value={form.nome}
                onChange={handleChange}
              />
              {errors.nome && <span className="text-red-500 text-sm mt-1">{errors.nome}</span>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="block w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#004E64]"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email}</span>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-2">
                Senha
              </label>
              <input
                id="password"
                name="senha"
                type="password"
                required
                className="block w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#004E64]"
                value={form.senha}
                onChange={handleChange}
              />
              {errors.senha && <span className="text-red-500 text-sm mt-1">{errors.senha}</span>}
            </div>

            <div>
              <label htmlFor="password-confirm" className="block text-sm font-medium text-gray-900 mb-2">
                Confirmar senha
              </label>
              <input
                id="password-confirm"
                name="confirmarSenha"
                type="password"
                required
                className="block w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#004E64]"
                value={form.confirmarSenha}
                onChange={handleChange}
              />
              {errors.confirmarSenha && (
                <span className="text-red-500 text-sm mt-1">{errors.confirmarSenha}</span>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 bg-[#004E64] text-white rounded-md hover:bg-[#003D4F] transition-colors duration-200"
          >
            {isLoading ? 'Cadastrando...' : 'Continuar'}
          </button>

          <p className="text-sm text-gray-600 text-center">
            Já tem uma conta?{' '}
            <Link to="/login" className="text-[#004E64] hover:text-[#003D4F]">
              Acesse aqui
            </Link>
          </p>
        </form>
      </div>

      {/* Right pane */}
      <div className="flex-1 relative overflow-hidden bg-[#003FFF]">
        <canvas 
          ref={gradientRef} 
          className="absolute inset-0 w-full h-full" 
          style={{ 
            minHeight: '100vh',
            opacity: gradientLoaded ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out'
          }}
        />
        <div className="relative z-10 flex items-center justify-center h-full p-8">
          <div className="text-center text-white">
            <h1 className="text-7xl font-bold mb-6">BOLSOPRO AI</h1>
            <p className="text-2xl">Seu bolso inteligente começa aqui</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;