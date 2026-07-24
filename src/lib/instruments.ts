export type InstrumentLiteral = "NIFTY" | "SENSEX" | "MIDCAP_NIFTY" | "BANK_NIFTY";

export const INSTRUMENTS: InstrumentLiteral[] = ["NIFTY", "SENSEX", "MIDCAP_NIFTY", "BANK_NIFTY"];

export const INSTRUMENT_LABEL: Record<InstrumentLiteral, string> = {
  NIFTY: "Nifty",
  SENSEX: "Sensex",
  MIDCAP_NIFTY: "Midcap Nifty",
  BANK_NIFTY: "Bank Nifty",
};
