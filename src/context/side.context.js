import { createContext } from 'react';

const SidebarContext = createContext()

const SidebarProvider = SidebarContext.Provider;
const SidebarConsumer = SidebarContext.Consumer;

export {SidebarProvider, SidebarConsumer, SidebarContext }
