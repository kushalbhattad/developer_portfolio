import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  Globe,
  Smartphone,
  ExternalLink
} from 'lucide-react';

interface SocialLinksBarProps {
  className?: string;
  iconSize?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
}

export const SocialLinksBar: React.FC<SocialLinksBarProps> = ({
  className = '',
  iconSize = 'md',
  showLabels = false
}) => {
  const { agencySettings } = useApp();
  const socials = agencySettings.socialLinks || {};

  const iconClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base'
  }[iconSize];

  const svgSize = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }[iconSize];

  const enabledSocials = agencySettings.enabledSocialLinks || {};

  const socialItems = [
    {
      id: 'behance',
      name: 'Behance',
      url: socials.behance,
      icon: (
        <span className="font-extrabold font-serif text-[11px] tracking-tighter">Bē</span>
      )
    },
    {
      id: 'dribbble',
      name: 'Dribbble',
      url: socials.dribbble,
      icon: (
        <Globe className={svgSize} />
      )
    },
    {
      id: 'github',
      name: 'GitHub',
      url: socials.github,
      icon: (
        <Github className={svgSize} />
      )
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      url: socials.linkedin,
      icon: (
        <Linkedin className={svgSize} />
      )
    },
    {
      id: 'twitter',
      name: 'Twitter / X',
      url: socials.twitter,
      icon: (
        <Twitter className={svgSize} />
      )
    },
    {
      id: 'instagram',
      name: 'Instagram',
      url: socials.instagram,
      icon: (
        <Instagram className={svgSize} />
      )
    },
    {
      id: 'youtube',
      name: 'YouTube',
      url: socials.youtube,
      icon: (
        <Youtube className={svgSize} />
      )
    },
    {
      id: 'playstore',
      name: 'Google Play',
      url: socials.playstore,
      icon: (
        <Smartphone className={svgSize} />
      )
    }
  ].filter(item => Boolean(item.url) && enabledSocials[item.id] !== false);

  if (socialItems.length === 0) return null;

  return (
    <div className={`flex flex-wrap items-center gap-2.5 ${className}`}>
      {socialItems.map(item => (
        <a
          key={item.id}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          title={`Visit our ${item.name}`}
          className={`group flex items-center justify-center rounded-full bg-white border border-[#111111]/15 text-[#111111] hover:bg-[#111111] hover:text-white hover:border-[#111111] transition-all duration-200 shadow-sm ${iconClasses}`}
        >
          {item.icon}
          {showLabels && <span className="ml-2 font-medium text-xs pr-2">{item.name}</span>}
        </a>
      ))}
    </div>
  );
};
