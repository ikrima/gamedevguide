import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Table from './Table';
import './styles.scss';

const Invoice = () => (
  <div className="invoice-wrapper">
    <section className="invoice-container" id="invoice">

      <div className="invoice-inner">
        <div className="row">
          <div className="col-6">
            <p className="h1">INVOICE</p>
          </div>
          <div className="col-6 text-right">
            Lisa Doe <br />
            PO Box 21177 <br />
            MELBOURNE VIC 8011 <br />
            Austria
          </div>
        </div>

        <hr />

        <div className="row">
          <div className="col-6">
            <p><strong>Invoice To</strong></p>
              Jone Doe <br />
              PO Box 21177 <br />
              MELBOURNE VIC 8011 <br />
              Austria
            </div>
          <div className="col-6 text-right">
            <p><strong>Details:</strong></p>
            <strong>Date:</strong> August 10, 2014 <br />
            <strong>ID:</strong> 1357995 <br />
            <strong>Amount Due:</strong> $ 3040
          </div>
        </div>

        <div className="divider my-4" />

        <Table />

        <div className="row">
          <div className="col-8">
            <p className="h3">Thanks for your business</p>
            <ul>
              <li>Aeserunt tenetur cum nihil repudiandae perferendis fuga vitae corporis!</li>
              <li>Laborum, necessitatibus recusandae ullam at iusto dolore.</li>
              <li>Voluptatum aperiam voluptates quasi!</li>
              <li>Assumenda, iusto, consequuntur corporis atque culpa saepe magnam recusandae</li>
              <li>Possimus odio ipsam magni sint reiciendis unde amet</li>
            </ul>
          </div>
          <div className="col-4 invoice-sum text-right">
            <ul className="list-unstyled">
              <li>Sub - Total amount: $ 2740</li>
              <li>Discount: -----</li>
              <li>Tax (12%): $300</li>
              <li><strong>Grand Total: $ 3040</strong></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
);

const Page = () => (
  <section className="page-invoice">
    <QueueAnim type="bottom" className="ui-animate">
      <div key="1"><Invoice /></div>
    </QueueAnim>
  </section>
);

export default Page;

