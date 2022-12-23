import toast from 'react-hot-toast';

const Index = () => {
  return (
    <div>
      <button onClick={() => toast('Here is your toast.')}>TOAST</button>
      <h1>Hello world!</h1>
    </div>
  );
};

export default Index;
