import Layout from "@/components/Layout";
import React from "react";

export default function ContactScreen() {
  return (
    <Layout title="Contact">
      <div className="mx-auto md:w-3/6 mt-4 mb-12">
        <div className="heading1 mt-2 md:mt-4">Contact Us</div>

        <form
          action="https://formsubmit.co/your@email.com"
          method="POST"
          className="flex flex-col gap-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Enter name here"
            required
            autoFocus
          />
          <input
            type="email"
            name="email"
            placeholder="Enter email here"
            required
          />
          <textarea
            name="textarea"
            placeholder="Enter your message here"
            rows={4}
            required
          />
          <button type="submit" className="pri-button-wide">
            Send
          </button>
        </form>
      </div>
    </Layout>
  );
}
