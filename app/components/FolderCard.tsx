import React from 'react';
import { Card, CardProps } from './CardSwap';

interface FolderCardProps extends CardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  tabColor?: string;
}

const FolderCard = React.forwardRef<HTMLDivElement, FolderCardProps>(
  ({ icon, title, desc, tabColor = '#10B981', className = '', ...rest }, ref) => {
    return (
      <Card
        ref={ref}
        {...rest}
        className={`!bg-white/[0.03] !border-white/10 backdrop-blur-2xl shadow-[0_25px_70px_-20px_rgba(0,0,0,0.6)] p-1.5 ${className}`}
      >
        {/* pestaña de la carpeta */}
        <div
          className="absolute -top-3 left-6 h-4 w-20 rounded-t-md"
          style={{ backgroundColor: tabColor, opacity: 0.9 }}
        />
        <div className="h-full w-full rounded-[calc(0.75rem-0.2rem)] bg-[#0A1210] p-6 flex flex-col gap-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
          <div className="w-10 h-10 rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/20 flex items-center justify-center text-emerald-400 text-[18px]">
            {icon}
          </div>
          <div>
            <h3 className="font-medium text-[18px] tracking-[-0.01em] mb-1">{title}</h3>
            <p className="text-white/55 text-[13px] leading-relaxed">{desc}</p>
          </div>
        </div>
      </Card>
    );
  }
);
FolderCard.displayName = 'FolderCard';

export default FolderCard;