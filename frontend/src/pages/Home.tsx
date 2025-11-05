type HomeProps = {
  onShowHome: () => void;
};

const Home = ({ onShowHome }: HomeProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <span>Welcome to the AI summarizer app!</span>
      <button onClick={onShowHome} className="bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg px-5 py-2.5 w-auto inline-flex justify-center">Let's go</button>
    </div>
  )
}

export default Home
