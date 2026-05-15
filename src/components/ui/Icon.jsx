import {
  Home, Repeat, TrendingUp, Key, HardHat, Building2, Building,
  Wallet, Calculator, PiggyBank, Receipt, Shield, Scale,
  FileText, Target, ClipboardList, Landmark, GitBranch, Banknote,
  Heart, Lightbulb, Award, Sparkles, Phone, Search,
  FileCheck, Handshake, BellRing, Mail, MapPin, Clock,
  Users, CheckCircle2, Star, ArrowRight, ChevronRight, ChevronDown,
  Menu, X, ExternalLink,
  BookOpen, GraduationCap, BadgeCheck, ShieldCheck, Layers, Zap,
} from 'lucide-react'

const MAP = {
  Home, Repeat, TrendingUp, Key, HardHat, Building2, Building,
  Wallet, Calculator, PiggyBank, Receipt, Shield, Scale,
  FileText, Target, ClipboardList, Landmark, GitBranch, Banknote,
  Heart, Lightbulb, Award, Sparkles, Phone, Search,
  FileCheck, Handshake, BellRing, Mail, MapPin, Clock,
  Users, CheckCircle2, Star, ArrowRight, ChevronRight, ChevronDown,
  Menu, X, ExternalLink,
  BookOpen, GraduationCap, BadgeCheck, ShieldCheck, Layers, Zap,
}

export default function Icon({ name, size = 22, className = '', strokeWidth = 1.75 }) {
  const C = MAP[name] || Home
  return <C size={size} strokeWidth={strokeWidth} className={className} aria-hidden="true" />
}
