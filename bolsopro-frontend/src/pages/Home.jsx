import { link } from 'react-router-dom';
import Header from "../components/common/Header.jsx";

function Home(){
    return (
        <>
            <Header/>
            <div className="w-[1440px] h-[2469px] relative bg-white overflow-hidden">
                <div
                    className="left-[223px] top-[295px] absolute justify-start text-black text-4xl font-normal font-['Inter']">Organize
                    seu dinheiro <br/>com inteligência
                </div>
                <div
                    className="left-[223px] top-[429px] absolute justify-start text-black text-xl font-normal font-['Inter']">Controle
                    financeiro pessoal com dicas<br/>inteligentes e sugestões de investimentos<br/>baseadas no seu
                    perfil
                </div>
                <div
                    className="w-52 h-96 left-[984px] top-[270px] absolute bg-neutral-900 rounded-2xl shadow-[inset_0px_2px_4px_0px_rgba(249,250,251,1.00)] overflow-hidden">
                    <div className="w-28 h-5 left-[42.22px] top-[255px] absolute">
                        <div className="w-24 h-5 left-0 top-0 absolute">
                            <div
                                className="w-24 h-4 left-0 top-[2px] absolute justify-center text-gray-50 text-sm font-thin font-['Roboto'] leading-tight">Touch
                                to unlock
                            </div>
                        </div>
                        <div className="w-4 h-4 left-[101.56px] top-[2px] absolute overflow-hidden">
                            <div
                                className="w-4 h-4 left-0 top-0 absolute outline outline-[1.28px] outline-offset-[-0.64px] outline-gray-50"/>
                        </div>
                    </div>
                    <div className="w-16 h-28 left-[66.56px] top-[45px] absolute">
                        <div className="w-16 h-14 left-0 top-0 absolute">
                            <div
                                className="w-16 h-16 left-0 top-[-6px] absolute justify-center text-gray-50 text-6xl font-extrabold font-['Roboto'] leading-[60px]">03
                            </div>
                        </div>
                        <div className="w-16 h-14 left-0 top-[60px] absolute">
                            <div
                                className="w-16 h-16 left-0 top-[-6px] absolute justify-center text-gray-50 text-6xl font-extrabold font-['Roboto'] leading-[60px]">40
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-96 h-96 left-[853px] top-[1751px] absolute">
                    <div
                        className="left-0 top-0 absolute justify-start text-black text-4xl font-light font-['Inter']">Como
                        Funciona
                    </div>
                    <div
                        className="left-[35px] top-[125px] absolute justify-start text-black text-2xl font-normal font-['Inter']">Cadastre-se
                    </div>
                    <div
                        className="left-[35px] top-[185px] absolute justify-start text-black text-2xl font-normal font-['Inter']">Registre
                        sua movimentação
                    </div>
                    <div
                        className="left-[35px] top-[245px] absolute justify-start text-black text-2xl font-normal font-['Inter']">Receba
                        alertas e sugestões
                    </div>
                    <div
                        className="left-[35px] top-[305px] absolute justify-start text-black text-2xl font-normal font-['Inter']">Acompanhe
                        sua evolução financeira
                    </div>
                    <div
                        className="left-0 top-[116px] absolute justify-start text-black text-4xl font-normal font-['Inter']">1
                    </div>
                    <div
                        className="left-0 top-[176px] absolute justify-start text-black text-4xl font-normal font-['Inter']">2
                    </div>
                    <div
                        className="left-0 top-[235px] absolute justify-start text-black text-4xl font-normal font-['Inter']">3
                    </div>
                    <div
                        className="left-0 top-[294px] absolute justify-start text-black text-4xl font-normal font-['Inter']">4
                    </div>
                    <div
                        className="w-36 h-14 left-0 top-[360px] absolute bg-gray-800 rounded-[10.20px] overflow-hidden">
                        <div
                            className="w-36 h-14 left-0 top-[-4.25px] absolute bg-gradient-to-b from-black/0 via-black/0 to-black/30 rounded-[10.20px]"/>
                        <div
                            className="w-12 h-5 left-[45.89px] top-[16px] absolute text-center justify-center text-white text-base font-medium font-['Roboto']">Testar
                            Agora
                        </div>
                    </div>
                </div>
                <div
                    className="w-36 h-14 left-[224px] top-[576px] absolute bg-gray-800 rounded-[10.20px] overflow-hidden">
                    <div
                        className="w-36 h-14 left-0 top-[-4.25px] absolute bg-gradient-to-b from-black/0 via-black/0 to-black/30 rounded-[10.20px]"/>
                    <div
                        className="w-36 left-[1px] top-[17px] absolute text-center justify-center text-white text-base font-medium font-['Roboto']">Testar
                        protótipo
                    </div>
                </div>
                <div className="w-96 h-96 left-[223px] top-[1751px] absolute">
                    <div
                        className="left-0 top-0 absolute justify-start text-black text-4xl font-light font-['Inter']">Funcionalidades
                    </div>
                    <div
                        className="w-44 h-32 left-0 top-[100px] absolute bg-[conic-gradient(from_180deg_at_50.00%_50.00%,_#0B875B_43deg,_#0C2F4D_155deg,_#5AD7FE_335deg)] rounded-2xl shadow-[12px_17px_51px_0px_rgba(0,0,0,0.22)] outline outline-1 outline-offset-[-1px] outline-white backdrop-blur-[3px]">
                        <div
                            className="w-32 left-[26px] top-[25px] absolute justify-center text-white text-xl font-bold font-['Yu_Gothic_UI'] tracking-wide">Registro
                            de receitas e despesas
                        </div>
                    </div>
                    <div
                        className="w-44 h-32 left-[212px] top-[99px] absolute bg-[conic-gradient(from_180deg_at_50.00%_50.00%,_#0B875B_43deg,_#0C2F4D_155deg,_#5AD7FE_335deg)] rounded-2xl shadow-[12px_17px_51px_0px_rgba(0,0,0,0.22)] outline outline-1 outline-offset-[-1px] outline-white backdrop-blur-[3px]">
                        <div
                            className="w-36 h-20 left-[14px] top-[28px] absolute justify-center text-white text-xl font-bold font-['Yu_Gothic_UI'] tracking-wide">Alertas
                            de movimentação
                        </div>
                    </div>
                    <div
                        className="w-44 h-32 left-0 top-[260px] absolute bg-[conic-gradient(from_180deg_at_50.00%_50.00%,_#0B875B_43deg,_#0C2F4D_155deg,_#5AD7FE_335deg)] rounded-2xl shadow-[12px_17px_51px_0px_rgba(0,0,0,0.22)] outline outline-1 outline-offset-[-1px] outline-white backdrop-blur-[3px]">
                        <div
                            className="w-32 h-20 left-[26px] top-[28px] absolute justify-center text-white text-xl font-bold font-['Yu_Gothic_UI'] tracking-wide">Sugestões
                            de economia
                        </div>
                    </div>
                    <div
                        className="w-44 h-32 left-[212px] top-[265px] absolute bg-[conic-gradient(from_180deg_at_50.00%_50.00%,_#0B875B_43deg,_#0C2F4D_155deg,_#5AD7FE_335deg)] rounded-2xl shadow-[12px_17px_51px_0px_rgba(0,0,0,0.22)] outline outline-1 outline-offset-[-1px] outline-white backdrop-blur-[3px]">
                        <div
                            className="w-36 h-20 left-[11px] top-[28px] absolute justify-center text-white text-xl font-bold font-['Yu_Gothic_UI'] tracking-wide">Investimentos
                            inteligentes
                        </div>
                    </div>
                </div>
                <img className="w-[1464px] h-[509px] left-[-12px] top-[1098px] absolute rounded-[51px]"
                     src="https://placehold.co/1464x509"/>
                <div className="w-[1079px] h-60 left-[223px] top-[1229px] absolute">
                    <div
                        className="left-0 top-0 absolute justify-start text-black text-4xl font-semibold font-['Inter'] leading-[48px]">Sobre
                        o BolsoPro AI
                    </div>
                    <div
                        className="left-0 top-[82px] absolute justify-start text-black text-xl font-normal font-['Inter']">Missão:
                        Transformar a vida financeira de pessoas <br/>comuns usando inteligência artificial
                    </div>
                    <div
                        className="w-36 h-14 left-0 top-[193px] absolute bg-gray-800 rounded-[10.20px] overflow-hidden">
                        <div
                            className="w-36 h-14 left-0 top-[-4.25px] absolute bg-gradient-to-b from-black/0 via-black/0 to-black/30 rounded-[10.20px]"/>
                        <div
                            className="w-12 h-5 left-[45.89px] top-[16px] absolute text-center justify-center text-white text-base font-medium font-['Roboto']">Teste
                        </div>
                    </div>
                    <div
                        className="w-96 h-60 left-[676px] top-0 absolute bg-zinc-100 rounded-[10px] shadow-[0px_0px_0px_5px_rgba(255,255,255,0.50)] overflow-hidden">
                        <div className="w-12 h-12 left-[178px] top-[97px] absolute overflow-hidden">
                            <div className="w-12 h-12 left-0 top-0 absolute bg-zinc-800"/>
                        </div>
                    </div>
                </div>
                <div
                    className="w-[1440px] px-32 py-4 left-0 top-0 absolute rounded inline-flex flex-col justify-start items-center gap-4">
                    <div className="self-stretch h-16 inline-flex justify-start items-center gap-8">
                        <div className="flex-1 flex justify-start items-center gap-2">
                            <div className="w-60 h-56 flex justify-start items-start gap-2.5">
                                <img className="w-60 h-60" src="https://placehold.co/242x242"/>
                            </div>
                        </div>
                        <div className="flex-1 flex justify-end items-center gap-10">
                            <div className="flex-1 self-stretch flex justify-start items-center gap-2">
                                <div
                                    className="justify-start text-slate-500 text-base font-normal font-['DM_Sans']">Inicio
                                </div>
                                <div data-icon="Arrow - Linear" data-size="16" className="w-4 h-4 relative">
                                    <div
                                        className="w-2.5 h-[4.72px] left-[2.73px] top-[6.97px] absolute outline outline-1 outline-offset-[-0.50px] outline-slate-500"/>
                                    <div
                                        className="w-4 h-4 left-[16.03px] top-[16.03px] absolute origin-top-left -rotate-180 opacity-0"/>
                                </div>
                            </div>
                            <div className="flex-1 self-stretch flex justify-start items-center gap-2">
                                <div
                                    className="justify-start text-slate-500 text-base font-normal font-['DM_Sans']">Sobre
                                </div>
                                <div data-icon="Arrow - Linear" data-size="16" className="w-4 h-4 relative">
                                    <div
                                        className="w-2.5 h-[4.72px] left-[2.73px] top-[6.97px] absolute outline outline-1 outline-offset-[-0.50px] outline-slate-500"/>
                                    <div
                                        className="w-4 h-4 left-[16.03px] top-[16.03px] absolute origin-top-left -rotate-180 opacity-0"/>
                                </div>
                            </div>
                            <div className="w-36 self-stretch relative flex justify-start items-center gap-2.5">
                                <div
                                    className="justify-start text-slate-500 text-base font-normal font-['DM_Sans']">Funcionalidades
                                </div>
                                <div data-icon="Arrow - Linear" data-size="16"
                                     className="w-4 h-4 left-[129px] top-[2.75px] absolute">
                                    <div
                                        className="w-2.5 h-[4.72px] left-[2.73px] top-[6.97px] absolute outline outline-1 outline-offset-[-0.50px] outline-slate-500"/>
                                    <div
                                        className="w-4 h-4 left-[16.03px] top-[16.03px] absolute origin-top-left -rotate-180 opacity-0"/>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-start items-center gap-2">
                            <div className="w-6 h-6 relative overflow-hidden">
                                <div className="w-[1.33px] h-0.5 left-[6.67px] top-[11px] absolute bg-slate-500"/>
                                <div className="w-5 h-5 left-[1.53px] top-[1.60px] absolute bg-slate-500"/>
                                <div className="w-6 h-6 left-0 top-0 absolute"/>
                            </div>
                            <div className="flex justify-center items-center gap-1.5">
                                <div
                                    className="text-center justify-center text-zinc-900 text-base font-normal font-['DM_Sans']">English
                                </div>
                            </div>
                            <div className="w-4 h-4 relative">
                                <div className="w-2.5 h-[5.09px] left-[3.33px] top-[6.25px] absolute bg-slate-500"/>
                                <div
                                    className="w-4 h-4 left-[16px] top-[16px] absolute origin-top-left -rotate-180 opacity-0"/>
                            </div>
                        </div>
                        <div className="flex justify-start items-start gap-3">
                            <div
                                className="h-12 px-4 rounded inline-flex flex-col justify-center items-center overflow-hidden">
                                <div
                                    className="text-center justify-center text-blue-700 text-base font-medium font-['DM_Sans']">Login
                                </div>
                            </div>
                            <div
                                className="self-stretch px-6 py-2.5 bg-gradient-to-l from-emerald-700 via-sky-950 to-cyan-300 rounded inline-flex flex-col justify-center items-center overflow-hidden">
                                <div
                                    className="text-center justify-center text-white text-base font-medium font-['DM_Sans']">Get
                                    Started
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-200"></div>
                </div>
            </div>
        </>
    )
}