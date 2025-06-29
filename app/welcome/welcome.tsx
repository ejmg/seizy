export function Welcome() {
  return (
    <main className="flex h-screen bg-indigo-900">
      <div className="flex-1 flex flex-col min-h-0 px-2">
        <header className="min-h-9 h-28 text-zinc-100 w-full">
          <nav className="flex justify-start h-full text-xl">
            <div className="mr-auto text-xl">
              <p>$USER</p>
            </div>
            <div>
              <p>
                Dashboard
              </p>
            </div>
            <div>
              <p>Calendar</p>
            </div>
          </nav>
        </header>
        <div className="flex rounded-2xl bg-zinc-50 w-full h-full p-2">
          <div className="flex flex-col w-2/3">
            <h1 className="text-3xl">Hello, $USER</h1>
            <div>
              <h2 className="text-2xl">Overview</h2>
              <div className="flex flex-col">
                <div className="border">
                  pet
                </div>
              </div>
              <div className="flex flex-col">
                <div className="border">
                  pet
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col ">
            <h2 className="text-2xl">Calendar</h2>
            <div className="border">
              this is a calendar dumbass
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

