import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {Eye, EyeOff, House, Loader2, Lock, Mail, MessageSquare, Phone, User} from "lucide-react";
import { Link } from "react-router-dom";

import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    cin:"",
    phoneNumber:"",
    address:"",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.firstName.trim()) return toast.error("Veuillez entrer votre prénom");
    if (!formData.lastName.trim()) return toast.error("Veuillez entrer votre nom");
    if (!formData.email.trim()) return toast.error("Veuillez entrer votre email");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Le format de l'email est invalide");
    if (!formData.password) return toast.error("Veuillez entrer votre mot de passe");
    if (formData.password.length < 6) return toast.error("Le mot de passe doit contenir au moins 6 caractères");
    if (!formData.phoneNumber) return toast.error("Veuillez entrer votre numéro de téléphone");
    if (!/^(0[67]|\+212)[0-9]{8}$/.test(formData.phoneNumber)) {
      return toast.error("Le numéro de téléphone est invalide");
    }
    if (!formData.address) return toast.error("Veuillez entrer votre adresse");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) signup(formData);
  };

  return (
      <div className="min-h-screen grid lg:grid-cols-2">
        {/* left side */}
        <div className="flex flex-col justify-center items-center p-6 sm:p-12">
          <div className="w-full max-w-md space-y-8">
            {/* LOGO */}
            <div className="text-center mb-8">
              <div className="flex flex-col items-center gap-2 group">
                <div
                    className="size-12 rounded-xl bg-primary/10 flex items-center justify-center
              group-hover:bg-primary/20 transition-colors"
                >
                  <MessageSquare className="size-6 text-primary" />
                </div>
                <h1 className="text-2xl font-bold mt-2">Créer votre compte</h1>
                <p className="text-base-content/60">Get started with your free account</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Prénom</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="size-5 text-base-content/40"/>
                  </div>
                  <input
                      type="text"
                      className='input input-bordered w-full pl-10'
                      placeholder="Entrer votre prénom"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Nom</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="size-5 text-base-content/40"/>
                  </div>
                  <input
                      type="text"
                      className={'input input-bordered w-full pl-10'}
                      placeholder="Entrer votre nom"
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Email</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="size-5 text-base-content/40"/>
                  </div>
                  <input
                      type="email"
                      className={'input input-bordered w-full pl-10'}
                      placeholder="Entrer votre email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Password</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="size-5 text-base-content/40"/>
                  </div>
                  <input
                      type={showPassword ? "text" : "password"}
                      className={'input input-bordered w-full pl-10'}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                  <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                        <EyeOff className="size-5 text-base-content/40"/>
                    ) : (
                        <Eye className="size-5 text-base-content/40"/>
                    )}
                  </button>
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Téléphone</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="size-5 text-base-content/40"/>
                  </div>
                  <input
                      type="text"
                      className={'input input-bordered w-full pl-10'}
                      placeholder="Entrer votre téléphone"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Adresse</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <House className="size-5 text-base-content/40"/>
                  </div>
                  <input
                      type="text"
                      className={'input input-bordered w-full pl-10'}
                      placeholder="Entrer votre adresse"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">CIN</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <House className="size-5 text-base-content/40"/>
                  </div>
                  <input
                      type="text"
                      className={'input input-bordered w-full pl-10'}
                      placeholder="Entrer votre adresse"
                      value={formData.cin}
                      onChange={(e) => setFormData({...formData, cin: e.target.value})}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-full" disabled={isSigningUp}>
                {isSigningUp ? (
                    <>
                      <Loader2 className="size-5 animate-spin"/>
                      Loading...
                    </>
                ) : (
                    "Créer votre compte"
                )}
              </button>
            </form>

            <div className="text-center">
              <p className="text-base-content/60">
                Already have an account?{" "}
                <Link to="/login" className="link link-primary">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* right side */}

        <AuthImagePattern
            title="Join our community"
            subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
        />
      </div>
  );
};
export default SignUpPage;