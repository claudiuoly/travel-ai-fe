import { UniversalProfile } from './UniversalProfile';

interface ExplorerProfileProps {
    type: 'advanced' | 'beginner';
}

export const ExplorerProfile = ({ type }: ExplorerProfileProps) => {
    return <UniversalProfile userType={type === 'advanced' ? 'explorer-advanced' : 'explorer-beginner'} />;
};
