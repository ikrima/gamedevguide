import React from 'react';
import QueueAnim from 'rc-queue-anim';

const Hero = () => (
  <section className="hero text-center">
    <h1 className="hero-title">FAQs</h1>
    <p className="hero-lead">Frequently Asked Questions</p>
  </section>
);

const FAQs = () => (
  <article className="article py-7 article-dark article-bordered">
    <div className="container-fluid container-mw-lg">
        <h4>Lorem ipsum dolor sit amet, consectetur adipisicing elit?</h4>
        <p>Eligendi amet quam inventore nam nostrum quaerat aliquam enim dicta illo laboriosam, quia odio voluptas animi consequatur non nemo deleniti, illum tempore assumenda reprehenderit corporis vel impedit nihil earum. Voluptas explicabo voluptatem iste libero officia cum voluptate, qui laboriosam atque.</p>
        <div className="divider my-5 divider-dashed" />

        <h4>Doloribus dolores, officia voluptatibus deserunt ratione debitis laboriosam?</h4>
        <p>Ut tempora, ad eos. Eveniet asperiores quaerat cupiditate quo, possimus officiis deserunt porro dolor mollitia iure minima id incidunt facilis accusamus ea quod perferendis veniam quas, et distinctio dolores corporis magni sapiente hic. Non saepe, veritatis, molestias debitis illum, quasi optio modi numquam harum repellat dolorem, velit blanditiis aliquid eveniet iusto! Sed reiciendis, tempora ex dolor fugiat temporibus, iste!</p>
        <div className="divider my-5 divider-dashed" />

        <h4>Illo recusandae beatae facilis?</h4>
        <p>Facere quo corporis distinctio recusandae pariatur possimus veniam ipsa assumenda autem, qui laborum molestias, magnam sed, voluptas optio illo. Illo, minima officia, labore ipsa fugiat, cum magnam ad error, nobis placeat suscipit? Enim magni delectus, sit, deserunt, repudiandae ratione hic et, libero nemo doloremque numquam quibusdam obcaecati pariatur dolorem.</p>
        <div className="divider my-5 divider-dashed" />

        <h4>Quidem doloribus, repudiandae?</h4>
        <p>Veniam optio iste aliquid dicta labore perspiciatis pariatur modi. Explicabo quisquam tenetur consectetur at possimus laborum aliquam a magni nulla veritatis accusamus consequuntur dolorem doloremque fugiat earum vero quos sit cumque saepe maiores sint, beatae ab..</p>
        <p>Nemo sed ipsa consequatur facere saepe dolore velit magni autem laborum exercitationem sequi animi vel necessitatibus veritatis, a aliquam voluptas voluptatum vitae qui harum, repellendus. Ut pariatur dignissimos dolore in repudiandae porro quos a delectus doloribus odit, maxime magnam eius soluta dolorum! Recusandae illum perferendis, expedita voluptates</p>
        <div className="divider my-5 divider-dashed" />

        <h4>Assumenda accusamus reiciendis obcaecati iusto?</h4>
        <p>Delectus provident dolorum quam quae, facere dolore sint modi eius ut enim distinctio. Ratione adipisci fugiat deserunt provident tempora? Reprehenderit, perspiciatis excepturi fugiat neque atque tenetur nesciunt cum perferendis dolor ullam similique iure nulla amet, delectus consequuntur qui quaerat unde quidem assumenda!</p>
        <p>At quis accusamus distinctio enim quaerat laudantium veniam laborum impedit cumque, minima porro. Aliquam laborum, tempore totam temporibus ea obcaecati at aut omnis fugit natus, doloribus, labore pariatur molestias velit veritatis?</p>
        <div className="divider my-5 divider-dashed" />

        <h4>Alias harum culpa earum cum id aspernatur repellendus aliquam?</h4>
        <p>Officia placeat vero ut quis perspiciatis ad doloribus. Voluptatum unde eaque magni ullam, veniam non illo doloremque ducimus voluptatibus quisquam, labore aspernatur ipsam optio sed necessitatibus culpa numquam vel, earum, autem porro laborum reprehenderit nulla. Nam quo, sunt, nesciunt ipsum architecto ipsa cumque minima reprehenderit dignissimos quod rem, amet deserunt, cupiditate dicta!</p>
        <p>Natus omnis quam ad, repellat similique nesciunt, quia molestias obcaecati itaque odio animi eaque distinctio error ipsa. Dolore quod vel possimus minima, maxime aperiam magni omnis nemo ex ipsa doloribus quidem adipisci eius fugit dignissimos praesentium velit quis, et totam, tempore necessitatibus doloremque!</p>
        <div className="divider my-5 divider-dashed" />

        <h4>Optio doloremque suscipit aut accusantium maxime provident cumque?</h4>
        <p>Unde repudiandae repellat in eos, ullam, hic eveniet dolorum dignissimos illum voluptates adipisci animi vel, aspernatur quaerat quos. Accusamus nihil odit quia, eligendi molestiae necessitatibus blanditiis beatae delectus nulla quidem. Blanditiis molestias harum iste ad iure corporis culpa ratione nulla est similique incidunt nisi tempore ea dignissimos, laudantium, sequi deleniti porro veritatis. Maiores nihil, dignissimos magnam beatae quae quia natus eligendi et, quos quas. Mollitia laboriosam, magni at minus veniam voluptates ad dolor aliquid quisquam nobis maiores dolorum repudiandae, iste ea alias pariatur consectetur voluptatibus ullam repellat autem tempore necessitatibus explicabo nisi.</p>
    </div>
  </article>
);

const Page = () => (
  <section className="page-faq chapter">
    <QueueAnim type="bottom" className="ui-animate">
      <div key="1"><Hero /></div>
      <div key="2"><FAQs /></div>
    </QueueAnim>
  </section>
);

export default Page;
