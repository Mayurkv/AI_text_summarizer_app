type HomeProps = {
  onShowHome: () => void;
  onShowAllSummaries: () => void;
};

const Home = ({ onShowHome, onShowAllSummaries }: HomeProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <span>Welcome to the AI summarizer app!</span>
      <div>
        <button onClick={onShowHome} className="bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg px-5 py-2.5 w-auto inline-flex justify-center">Let's go</button>
        <button onClick={onShowAllSummaries} className="bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg ml-2.5 px-5 py-2.5 w-auto inline-flex justify-center">Show all summaries</button>
      </div>
    </div>
  )
}

export default Home
