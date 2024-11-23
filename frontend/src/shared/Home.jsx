/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Shield, Users, Key } from 'lucide-react'

const Home = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-br from-slate-900 to-slate-700 text-white p-4">
      <Card className="w-full max-w-3xl bg-white/10 backdrop-blur-md border-none text-white">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold mb-2">Welcome to the RBAC Dashboard</CardTitle>
          <CardDescription className="text-xl text-gray-300">
            Manage your Role-Based Access Control with ease
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row justify-around items-center space-y-6 md:space-y-0 md:space-x-6 p-6">
          <FeatureCard
            icon={<Users className="h-12 w-12 text-blue-400" />}
            title="User Management"
            description="Easily manage users and their roles"
          />
          <FeatureCard
            icon={<Shield className="h-12 w-12 text-green-400" />}
            title="Role Management"
            description="Create and assign roles with specific permissions"
          />
          <FeatureCard
            icon={<Key className="h-12 w-12 text-yellow-400" />}
            title="Permission Control"
            description="Fine-grained control over system permissions"
          />
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 p-6">
          <Button onClick={handleLogin} size="lg" className="w-full sm:w-auto">
            Login
          </Button>
          <Button onClick={handleSignup} size="lg" variant="outline" className="w-full sm:w-auto">
            Sign Up
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="flex flex-col items-center text-center">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

export default Home;

