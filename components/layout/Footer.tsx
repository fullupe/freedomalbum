export default function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="border-t bg-background/80 backdrop-blur-sm transition-all">
      <div className="container py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <h3 className="font-cormorant text-xl font-semibold">Nkansah & Joyce</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              A beautiful collection of memories from our special day
            </p>
          </div>
          <div className="lg:col-span-2 lg:flex lg:items-end lg:justify-end">
            <p className="text-sm text-muted-foreground">
              © {year} Nkansah & Joyce Wedding Album. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}