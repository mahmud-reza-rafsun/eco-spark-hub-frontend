import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerTitle } from "@/components/ui/drawer";
import { useState } from "react";


export function EcoSparkChat({ isOpen, onClose }: { isOpen: boolean; onClose: () => void; }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Drawer open={isOpen} onOpenChange={setIsOpen} side="right">
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Drawer Title</DrawerTitle>
                        <DrawerDescription>
                            This is a description of what this drawer contains.
                        </DrawerDescription>
                    </DrawerHeader>

                    <div className="p-6">
                        {/* Your content here */}
                    </div>

                    <DrawerFooter>
                        <Button variant="outline" onClick={() => setIsOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={() => setIsOpen(false)}>
                            Save
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
}