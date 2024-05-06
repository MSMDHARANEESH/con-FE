import React from 'react'
import {useNavigate, Link} from "react-router-dom";
import styles from "./styles.module.css";
import './style.css'
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';
import {useLocation} from 'react-router-dom';

function Buy(props) {
  const location = useLocation();

  let   printDocument = () => {
    console.log('function')
    const doc = new jsPDF();
    const pdfTable = document.getElementById('divToPrint');
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = {
      content: html, styles: {
        logo: {
          alignment: 'center',
          maxHeight: 50, 
          maxWidth: 80,
          
        },
        other: {
          alignment: 'center',
          margin: [0, 30, 0, 30],
        },
        addr: {
          margin: [0, 0, 0, 40],
        },
        addrhead: {
          fontSize: 25,
        },
        para: {
          fontSize: 18,
          lineHeight: 0.5,
        },
        tstyle: {
          alignment: 'center',
          margin: [30, 0, 30, 0],
        },
      }
    };
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.createPdf(documentDefinition).open();
  }


  var items = location.state.item;
  
  var totalprice = 0;
  items.forEach(item => {
    totalprice += item.price * item.weight;
  })


  function toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }

  var [data, setdata] = React.useState('');
  toDataURL('logo.png', function (dataUrl) {
    setdata(dataUrl);
  })

  return (
    <div>
      <div id="divToPrint">
        <div className="logo my-auto mx-4">
          <h1 className='heading'>Invoice</h1>
          <img src={data} style={{ maxWidth: '100px', maxHeight: '100px' }} alt="Logo" />
        </div>
        <div className='addr'>
          <h2 className='addrhead'>Billed To:</h2>
          <p className='para'>Pradeep Raja</p>
          <p className='para'>Pramathi Road,</p>
          <p className='para'>Namakkal,</p>
          <p className='para'>Tamil Nadu.</p>
          <p className='para'>pradeeprm2310@gmail.com</p>
          <br/>
        </div>
        <div className='wid' />
        {items.length > 0 && (
          <div className="flex flex-wrap max-w-7xl mx-auto my-4">
            <div className="flex flex-col flex-1">
              <div className='tstyle'>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Price</th>
                      <th>With Tax</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => {
                      return (
                        <tr>
                          <th>{item.title}</th>
                          <th>Rs. {item.price * item.weight }</th>
                          <th>Rs. {item.price * item.weight 
                          + 10}</th>
                        </tr>
                      );
                    })}
                    <tr>
                      <th></th>
                      <th>Total</th>
                      <th>Rs. {totalprice + items.length * 10}</th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )
        }
        <div className="flex my-auto mx-4 logo">
          <h1 className='other'>Thanks for the Business</h1>
        </div>
      </div >

      <div className='flex print-btn'>
      <button onClick={printDocument} className='btn' >Print Invoice</button>
      </div>
    </div>
  )
}

export default Buy;
