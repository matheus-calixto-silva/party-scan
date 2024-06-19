import { GuestProvider } from '@app/contexts/GuestContext';
import { ThemeProvider } from '@app/contexts/ThemeProvider';
import Home from '@views/pages/Home';

const App = () => (
  <ThemeProvider>
    <GuestProvider>
      <div className="container mx-auto py-10">
        <Home />
      </div>
    </GuestProvider>
  </ThemeProvider>
);

export default App;
