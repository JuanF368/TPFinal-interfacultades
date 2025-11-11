import React from "react";
import { MdArrowOutward } from "react-icons/md";

const CartaDisciplina = ({titulo, imagen, reglamento, tipo}) => {
    return (
        <div className='relative bg-white rounded-2xl overflow-hidden min-w-[260px] max-w-[280px]'>
            <a href={reglamento} target="_blank" rel="noopener noreferrer">
            <div className='h-40 w-full overflow-hidden relative cursor-pointer'>
                <img src={imagen} alt={titulo} className='object-cover w-full h-full' />
                <div className='absolute bottom-3 left-3 bg-[#E94D1A] bg-opacity-90 text-white text-xs font-semibold rounded-full px-3 py-1'>
                    {tipo}
                </div>
                <div className='absolute top-3 right-3 bg-[#E94D1A] bg-opacity-90 rounded-full w-8 h-8 flex items-center justify-center'>
                    <MdArrowOutward className='text-[#ffffff] h-5 w-5' />
                </div>
            </div>
            </a>
            <div className='p-4 flex flex-col gap-2'>
                <h3 className='text-lg font-semibold text-gray-800 text-left'> {titulo} </h3>
            </div>
        </div>
    );
}

export default CartaDisciplina;
