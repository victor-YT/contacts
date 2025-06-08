import { Button } from '@/components/ui/button';

export default function ContactActionButton({ icon: Icon }) {
    return (
        <Button className="flex-1 bg-[#AD2F4F] text-white hover:bg-[#922742] text-lg py-3 rounded-lg">
            <Icon size={20} />
        </Button>
    );
}
