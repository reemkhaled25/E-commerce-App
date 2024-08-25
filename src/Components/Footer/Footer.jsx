import React, { useEffect, useState } from 'react'
import Style from './Footer.module.css'
export default function Footer() {

  return <>
    <footer className='bg-zinc-900 text-white'>
      <div className="container mx-auto text-center py-6">
        <div className="footer-icons flex items-center justify-center gap-4 text-sm">
          <div className="icon"><i className="fa-brands fa-facebook-f"></i> </div>
          <div className="icon"> <i className="fa-brands fa-twitter"></i> </div>
          <div className="icon"><i className="fa-brands fa-google"></i> </div>
          <div className="icon"><i className="fa-brands fa-instagram"></i> </div>
          <div className="icon"><i className="fa-brands fa-linkedin-in"></i> </div>
          <div className="icon"><i className="fa-brands fa-github"></i> </div>
        </div>

      </div>
      <div className="footer-footer bg-zinc-950 text-center py-4">
          <p>Copyright © 2024 Fresh Cart. Powered by Fresh Cart.</p>
        </div>
    </footer>


  </>
}
