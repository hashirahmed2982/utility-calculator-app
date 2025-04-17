export default function Contact() {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-gray-800">
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
        <p className="mb-6">Have questions or suggestions? We'd love to hear from you.</p>
        <form action="https://formspree.io/f/your-form-id" method="POST" className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input type="text" name="name" required className="w-full px-4 py-2 border border-gray-300 rounded" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input type="email" name="email" required className="w-full px-4 py-2 border border-gray-300 rounded" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Message</label>
            <textarea name="message" rows="4" required className="w-full px-4 py-2 border border-gray-300 rounded"></textarea>
          </div>
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Send Message</button>
        </form>
      </div>
    );
  }