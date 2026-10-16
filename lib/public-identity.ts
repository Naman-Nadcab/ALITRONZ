export type PublicIdentity = {
  legalName: string;
  email: string;
  address: string;
  registration: string;
  jurisdiction: string;
};

function read(name: string) {
  return process.env[name]?.trim() ?? "";
}

export function getPublicIdentity(): PublicIdentity {
  const email = read("NEXT_PUBLIC_CONTACT_EMAIL");
  return {
    legalName: read("NEXT_PUBLIC_LEGAL_NAME"),
    email: email.includes("@") ? email : "",
    address: read("NEXT_PUBLIC_COMPANY_ADDRESS"),
    registration: read("NEXT_PUBLIC_COMPANY_REGISTRATION"),
    jurisdiction: read("NEXT_PUBLIC_JURISDICTION"),
  };
}
