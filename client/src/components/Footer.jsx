export default function Footer() {
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-secondary-custom bg-primary-custom smooth-transition">
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-custom pb-6">
        <div className="md:max-w-96">
          <img
            className="h-9"
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/dummyLogo/dummyLogoDark.svg"
            alt="dummyLogoDark"
          />
          <p className="mt-6 text-sm text-secondary-custom">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>
        <div className="flex-1 flex items-start md:justify-end gap-20">
          <div>
            <h2 className="font-semibold mb-5 text-primary-custom">Company</h2>
            <ul className="text-sm space-y-2">
              <li>
                <a href="#" className="text-secondary-custom hover:text-primary-custom transition-colors duration-200">Home</a>
              </li>
              <li>
                <a href="#" className="text-secondary-custom hover:text-primary-custom transition-colors duration-200">About us</a>
              </li>
              <li>
                <a href="#" className="text-secondary-custom hover:text-primary-custom transition-colors duration-200">Contact us</a>
              </li>
              <li>
                <a href="#" className="text-secondary-custom hover:text-primary-custom transition-colors duration-200">Privacy policy</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold text-primary-custom mb-5">
              Subscribe to our newsletter
            </h2>
            <div className="text-sm space-y-2">
              <p className="text-secondary-custom">
                The latest news, articles, and resources, sent to your inbox
                weekly.
              </p>
              <div className="flex items-center gap-2 pt-4">
                <input
                  className="border border-custom placeholder-secondary-custom focus:ring-2 ring-indigo-600 outline-none w-full max-w-64 h-9 rounded px-2 bg-primary-custom text-primary-custom smooth-transition"
                  type="email"
                  placeholder="Enter your email"
                />
                <button className="bg-primary hover:bg-primary-dark w-24 h-9 text-white rounded transition-colors duration-200">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="pt-4 text-center text-xs md:text-sm pb-5 text-secondary-custom">
        Copyright 2024 © <a href="https://prebuiltui.com" className="text-primary hover:text-primary-dark transition-colors duration-200">PrebuiltUI</a>. All
        Right Reserved.
      </p>
    </footer>
  );
}
