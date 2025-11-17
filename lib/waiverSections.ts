export interface WaiverSection {
  id: string;
  title: string;
  summary: string;
  fullText: string;
}

export const waiverSections: WaiverSection[] = [
  {
    id: 'voluntary-participation',
    title: 'Voluntary Participation',
    summary: 'I acknowledge that my participation in Tactical Home Solutions training is entirely voluntary.',
    fullText: `I acknowledge that my participation in Tactical Home Solutions ("T.H.S.") training programs, courses, and activities (collectively, "Activities") is entirely voluntary. I understand that I am under no obligation to participate and may withdraw at any time.`
  },
  {
    id: 'inherent-risks',
    title: 'Acknowledgment of Inherent Risks',
    summary: 'I understand that tactical training involves inherent risks of serious injury or death.',
    fullText: `I understand and acknowledge that tactical training, firearms handling, force-on-force scenarios, physical exercises, and home defense activities involve inherent risks, dangers, and hazards that may result in serious bodily injury, permanent disability, paralysis, or death. These risks include, but are not limited to: accidents involving firearms (including accidental discharge, ricochets, and malfunctions); physical exertion and stress; falls and collisions; exposure to simulated threats and high-stress scenarios; use of training equipment and protective gear; and the actions or negligence of other participants, instructors, or third parties.`
  },
  {
    id: 'health-fitness',
    title: 'Health, Fitness, and Legal Eligibility',
    summary: 'I certify that I am physically and mentally fit to participate and legally eligible.',
    fullText: `I certify that I am in good physical and mental health, have no medical conditions that would prevent me from safely participating in the Activities, and am legally eligible to participate in firearms training and tactical activities under applicable federal, state, and local laws. I understand that T.H.S. may require medical clearance or documentation at its discretion. I agree to inform T.H.S. immediately of any changes to my health status or legal eligibility.`
  },
  {
    id: 'safety-rules',
    title: 'Compliance with Safety Rules',
    summary: 'I agree to follow all safety rules, instructions, and protocols at all times.',
    fullText: `I agree to follow all safety rules, instructions, protocols, and commands provided by T.H.S. instructors and staff at all times. I understand that failure to comply with safety rules may result in immediate removal from the Activities without refund. I acknowledge that I am responsible for my own safety and the safety of others, and I will not engage in any unsafe or prohibited conduct.`
  },
  {
    id: 'assumption-of-risk',
    title: 'Assumption of Risk',
    summary: 'I voluntarily assume all risks associated with participation in these Activities.',
    fullText: `I voluntarily assume all risks, both known and unknown, associated with my participation in the Activities, including risks that may arise from the negligence or carelessness of T.H.S., its owners, employees, contractors, instructors, agents, or other participants. I understand that no amount of care, caution, instruction, or expertise can eliminate all risks inherent in tactical training and firearms activities.`
  },
  {
    id: 'release-liability',
    title: 'Release of Liability',
    summary: 'I release T.H.S. from all claims and liability arising from my participation.',
    fullText: `I hereby release, waive, discharge, and covenant not to sue T.H.S., its owners, officers, directors, employees, contractors, instructors, agents, volunteers, and all other persons or entities associated with T.H.S. (collectively, "Released Parties") from any and all claims, demands, causes of action, liabilities, damages, costs, expenses, or losses of any kind (including attorney's fees) that I, my heirs, assigns, or legal representatives may have or claim to have, now or in the future, arising out of or related to my participation in the Activities, whether caused by the negligence of the Released Parties or otherwise.`
  },
  {
    id: 'indemnity',
    title: 'Indemnity and Hold Harmless',
    summary: 'I agree to indemnify and hold T.H.S. harmless from any claims brought by others.',
    fullText: `I agree to indemnify, defend, and hold harmless the Released Parties from any and all claims, demands, causes of action, liabilities, damages, costs, expenses, or losses (including attorney's fees) brought by any third party (including other participants, family members, or government entities) arising out of or related to my participation in the Activities, my violation of any law or regulation, or my breach of this Agreement.`
  },
  {
    id: 'medical-authorization',
    title: 'Medical Authorization',
    summary: 'I authorize T.H.S. to obtain emergency medical treatment if necessary.',
    fullText: `In the event of an injury or medical emergency during the Activities, I authorize T.H.S. and its representatives to obtain emergency medical treatment for me, including transportation to a medical facility, at my expense. I understand that T.H.S. is not obligated to provide medical care and that I am responsible for all medical expenses incurred. I release T.H.S. from any liability arising from the provision or failure to provide medical care.`
  },
  {
    id: 'home-premises',
    title: 'Use of Home Premises (In-Home Training)',
    summary: 'I understand the risks and responsibilities related to in-home training sessions.',
    fullText: `If I am participating in in-home training sessions, I acknowledge that T.H.S. will be conducting Activities on my private property. I represent that I own the property or have obtained all necessary permissions from the property owner. I understand that in-home training may involve assessment of my home's layout, potential hazards, and security vulnerabilities. I agree to maintain a safe environment and to inform T.H.S. of any known hazards, structural issues, or unsafe conditions. I release T.H.S. from any liability related to damage to my property or injuries that may occur during in-home training sessions.`
  },
  {
    id: 'no-guarantees',
    title: 'No Legal or Tactical Guarantees',
    summary: 'I understand that T.H.S. does not guarantee outcomes or provide legal advice.',
    fullText: `I understand that T.H.S. provides educational training and does not guarantee that participation in the Activities will result in any specific outcome, including but not limited to: improved tactical skills, successful home defense, legal protection, or personal safety. T.H.S. does not provide legal advice, and I acknowledge that I am responsible for understanding and complying with all applicable laws regarding self-defense, home defense, and firearms ownership in my jurisdiction.`
  },
  {
    id: 'electronic-records',
    title: 'Electronic Records & Signature',
    summary: 'I consent to the use of electronic signatures and records.',
    fullText: `I consent to the use of electronic signatures and electronic records in connection with this Agreement. I understand that my electronic signature has the same legal effect as a handwritten signature. I agree that a copy of this Agreement, including my electronic signature, may be used as the original and will be admissible in any legal proceeding.`
  },
  {
    id: 'governing-law',
    title: 'Governing Law & Severability / Entire Agreement',
    summary: 'This Agreement is governed by applicable law and represents the entire agreement between the parties.',
    fullText: `This Agreement shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law principles. If any provision of this Agreement is found to be unenforceable or invalid, the remaining provisions shall remain in full force and effect. This Agreement constitutes the entire agreement between me and T.H.S. regarding my participation in the Activities and supersedes all prior or contemporaneous communications, agreements, or understandings, whether oral or written.`
  }
];
