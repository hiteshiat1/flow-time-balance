export interface WellnessActivity {
  title: string;
  category: "energy" | "calm" | "focus" | "rest";
  duration: string;
  rating: number;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  featured?: boolean;
  instructions: string[];
  benefits: string[];
  tips: string[];
  modifications: {
    easier: string;
    harder: string;
  };
  scientificBacking: string;
}

export const wellnessActivities: WellnessActivity[] = [
  // Energy Activities
  {
    title: "Desk Stretches",
    category: "energy",
    duration: "5 min",
    rating: 4.7,
    description: "Release tension and boost energy without leaving your desk",
    difficulty: "Beginner",
    instructions: [
      "Sit up straight with feet flat on floor",
      "Roll shoulders backward 10 times, then forward 10 times",
      "Tilt head to right ear toward shoulder, hold 15 seconds, repeat left",
      "Clasp hands behind head, lean back and look up for 10 seconds",
      "Twist spine left, hold chair back, hold 15 seconds, repeat right",
      "Reach arms overhead, lean left then right, hold each 10 seconds",
      "Ankle circles - 10 each direction, both feet",
      "End with 3 deep breaths, rolling shoulders down and back"
    ],
    benefits: [
      "Improves circulation and reduces muscle tension",
      "Prevents repetitive strain injuries",
      "Boosts energy and mental alertness",
      "Reduces back and neck pain"
    ],
    tips: [
      "Set hourly reminders to maintain consistency",
      "Focus on breathing deeply during each stretch",
      "Never force stretches - gentle tension is enough"
    ],
    modifications: {
      easier: "Hold stretches for 5-10 seconds instead of 15",
      harder: "Add resistance bands or hold stretches for 30 seconds"
    },
    scientificBacking: "Research shows that workplace stretching reduces musculoskeletal disorders by up to 72% and increases productivity by improving blood flow to the brain."
  },
  {
    title: "Energy Boost Sequence",
    category: "energy",
    duration: "7 min",
    rating: 4.8,
    description: "Quick movements to revitalize your body",
    difficulty: "Intermediate",
    instructions: [
      "Start standing with feet hip-width apart",
      "Arm swings: 20 forward, 20 backward, 20 across body",
      "Marching in place with high knees for 30 seconds",
      "10 jumping jacks (or step-touch modifications)",
      "Leg swings: 10 each leg forward/back, then side to side",
      "Torso twists: 20 with arms extended",
      "Calf raises: 15 slow, controlled movements",
      "Finish with 10 deep breaths with arms reaching overhead"
    ],
    benefits: [
      "Activates sympathetic nervous system for alertness",
      "Improves coordination and balance",
      "Increases heart rate and circulation",
      "Releases endorphins for natural energy"
    ],
    tips: [
      "Modify intensity based on your current energy level",
      "Wear comfortable, non-restrictive clothing",
      "Stay hydrated before and after"
    ],
    modifications: {
      easier: "Perform seated or reduce repetitions by half",
      harder: "Add light weights or increase tempo"
    },
    scientificBacking: "Studies demonstrate that 7 minutes of moderate exercise can increase energy levels for up to 12 hours by stimulating mitochondrial function and neurotransmitter production."
  },
  {
    title: "Morning Activation",
    category: "energy",
    duration: "4 min",
    rating: 4.6,
    description: "Wake up your body with gentle movements",
    difficulty: "Beginner",
    instructions: [
      "Begin lying in bed or standing beside it",
      "Gentle full-body stretch reaching arms overhead (30 seconds)",
      "Knee-to-chest hugs: alternate legs 10 times each",
      "Spinal twists: lying down, knees to one side, hold 20 seconds each",
      "Cat-cow stretches: 10 slow, flowing movements",
      "Standing forward fold: let arms hang loose for 30 seconds",
      "Gentle neck rolls: 5 each direction",
      "3 energizing breaths: inhale arms up, exhale sweep down"
    ],
    benefits: [
      "Gradually awakens the nervous system",
      "Improves spinal mobility after sleep",
      "Stimulates circulation and lymphatic drainage",
      "Sets positive tone for the day"
    ],
    tips: [
      "Move slowly and listen to your body",
      "Do this immediately after waking for best results",
      "Open a window for fresh air if possible"
    ],
    modifications: {
      easier: "Stay in bed for most movements",
      harder: "Add sun salutation sequence"
    },
    scientificBacking: "Morning movement activates the body's circadian rhythm, improving cortisol regulation and enhancing cognitive function throughout the day."
  },
  {
    title: "Power Pump",
    category: "energy",
    duration: "6 min",
    rating: 4.7,
    description: "High-energy routine to boost motivation",
    difficulty: "Advanced",
    instructions: [
      "Dynamic warm-up: arm circles and leg swings (1 minute)",
      "Burpees: 5 repetitions with full jump",
      "Mountain climbers: 20 total (10 each leg)",
      "Jump squats: 10 explosive movements",
      "Push-ups: 8-12 based on ability",
      "High knees running in place: 30 seconds",
      "Plank hold: 30 seconds",
      "Cool down with victory pose and deep breathing (1 minute)"
    ],
    benefits: [
      "Releases powerful endorphin rush",
      "Builds strength and cardiovascular fitness",
      "Enhances mental resilience and confidence",
      "Provides sustained energy boost"
    ],
    tips: [
      "Focus on proper form over speed",
      "Rest 10 seconds between exercises if needed",
      "Celebrate completion with positive self-talk"
    ],
    modifications: {
      easier: "Reduce reps by half and remove jumping movements",
      harder: "Increase reps and add weights or resistance bands"
    },
    scientificBacking: "High-intensity exercise triggers BDNF (brain-derived neurotrophic factor) production, enhancing neuroplasticity and motivation for up to 24 hours."
  },
  {
    title: "Vitality Flow",
    category: "energy",
    duration: "8 min",
    rating: 4.5,
    description: "Dynamic sequence to increase energy levels",
    difficulty: "Intermediate",
    instructions: [
      "Start in mountain pose with grounding breaths (1 minute)",
      "Sun salutation A: 3 flowing repetitions",
      "Warrior I to Warrior III transitions: 3 each side",
      "Chair pose to standing splits: 5 flows each leg",
      "Side body stretches: reach arms overhead, lean each way",
      "Eagle pose: balance and twist, 30 seconds each side",
      "Bridge pose: 3 lifts, hold 15 seconds each",
      "Finish in child's pose with gratitude reflection"
    ],
    benefits: [
      "Combines strength, balance, and flexibility",
      "Activates core and stabilizing muscles",
      "Improves mind-body connection",
      "Creates sustainable energy through mindful movement"
    ],
    tips: [
      "Breathe consciously throughout each movement",
      "Use modifications for poses as needed",
      "Focus on smooth transitions rather than perfect poses"
    ],
    modifications: {
      easier: "Use wall support for balance poses",
      harder: "Hold poses longer or add challenging variations"
    },
    scientificBacking: "Yoga-based movement sequences activate the parasympathetic nervous system while building strength, creating balanced energy that lasts longer than stimulant-based boosts."
  },
  {
    title: "Quick Energizer",
    category: "energy",
    duration: "3 min",
    rating: 4.4,
    description: "Fast energy boost for busy schedules",
    difficulty: "Beginner",
    instructions: [
      "Stand and shake out entire body vigorously (30 seconds)",
      "Arm circles: 10 small, 10 medium, 10 large each direction",
      "Breathing with movement: inhale reach up, exhale fold down (10x)",
      "Shoulder blade squeezes: 15 repetitions",
      "Calf raises with arm reaches: 20 repetitions",
      "Power breathing: 10 strong exhales through mouth",
      "Finish with positive affirmation and smile"
    ],
    benefits: [
      "Rapidly increases circulation",
      "Activates energy through breath",
      "Quick mood enhancement",
      "Requires minimal space and time"
    ],
    tips: [
      "Put full energy into movements despite short duration",
      "Can be done anywhere, even in work clothes",
      "Use when feeling sluggish mid-day"
    ],
    modifications: {
      easier: "Perform seated or reduce intensity",
      harder: "Add light cardio movements like step-ups"
    },
    scientificBacking: "Brief, vigorous movement increases norepinephrine and dopamine levels within 3-5 minutes, providing immediate cognitive and physical energy enhancement."
  },
  {
    title: "Active Recovery",
    category: "energy",
    duration: "10 min",
    rating: 4.6,
    description: "Gentle movement to restore energy",
    difficulty: "Beginner",
    instructions: [
      "Begin with mindful walking in place (2 minutes)",
      "Gentle joint circles: ankles, knees, hips, shoulders, wrists",
      "Flowing spinal movements: cat-cow, side bends, twists",
      "Light stretching sequence: calves, hamstrings, hip flexors",
      "Restorative breathing: 4-4-6-2 pattern (inhale-hold-exhale-pause)",
      "Self-massage: neck, shoulders, forearms",
      "Progressive muscle relaxation: tense and release each muscle group",
      "End with intention setting for continued restoration"
    ],
    benefits: [
      "Promotes recovery without depleting energy",
      "Reduces muscle tension and soreness",
      "Improves circulation and lymphatic flow",
      "Balances active and passive recovery"
    ],
    tips: [
      "Use after intense physical or mental work",
      "Listen to your body and adjust intensity",
      "Focus on areas that feel tight or tired"
    ],
    modifications: {
      easier: "Perform entirely seated or lying down",
      harder: "Add gentle yoga flows or light resistance work"
    },
    scientificBacking: "Active recovery promotes faster healing by maintaining blood flow while reducing metabolic stress, leading to improved energy restoration compared to complete rest."
  },
  {
    title: "Momentum Builder",
    category: "energy",
    duration: "5 min",
    rating: 4.8,
    description: "Build physical and mental momentum",
    difficulty: "Intermediate",
    instructions: [
      "Start with intention-setting: visualize your goals (30 seconds)",
      "Progressive movement: walk → march → jog in place (2 minutes)",
      "Dynamic stretches: leg swings, arm swings, hip circles",
      "Power poses: superman, warrior, victory pose (30 seconds each)",
      "Motivational breathing: strong inhales, powerful exhales (10x)",
      "Positive self-talk: repeat empowering phrases",
      "Finish with commitment gesture: fist pump or hand to heart"
    ],
    benefits: [
      "Creates psychological and physical momentum",
      "Builds confidence and determination",
      "Integrates mental and physical energy",
      "Prepares mind and body for challenges"
    ],
    tips: [
      "Use before important tasks or meetings",
      "Combine with goal visualization",
      "Choose personal power poses that feel authentic"
    ],
    modifications: {
      easier: "Focus more on visualization and breathing",
      harder: "Add resistance exercises or longer cardio segments"
    },
    scientificBacking: "The combination of physical activation and positive psychology techniques increases self-efficacy and performance by up to 25% through enhanced neural pathway activation."
  },

  // Calm Activities
  {
    title: "4-7-8 Breathing",
    category: "calm",
    duration: "3 min",
    rating: 4.9,
    description: "Calm your nervous system with this powerful breathing technique",
    difficulty: "Beginner",
    featured: true,
    instructions: [
      "Sit comfortably with back straight, feet on floor",
      "Place tongue tip behind upper front teeth",
      "Exhale completely through mouth making whoosh sound",
      "Close mouth, inhale through nose for 4 counts",
      "Hold breath for 7 counts",
      "Exhale through mouth for 8 counts with whoosh sound",
      "Repeat cycle 3-4 times initially",
      "End with normal breathing and notice the calm feeling"
    ],
    benefits: [
      "Activates parasympathetic nervous system",
      "Reduces anxiety and stress hormones",
      "Lowers heart rate and blood pressure",
      "Improves sleep quality when practiced regularly"
    ],
    tips: [
      "Speed doesn't matter - maintain ratio of 4:7:8",
      "Practice twice daily for best results",
      "Stop if you feel dizzy - build up gradually"
    ],
    modifications: {
      easier: "Use 3:5:6 ratio or breathe through nose for exhale",
      harder: "Increase to 6-8 cycles or try 6:10:12 ratio"
    },
    scientificBacking: "Dr. Andrew Weil's 4-7-8 technique activates the vagus nerve, reducing cortisol by up to 23% within minutes and training the nervous system for better stress response."
  },
  {
    title: "Walking Meditation",
    category: "calm",
    duration: "10 min",
    rating: 4.6,
    description: "Mindful movement to center yourself",
    difficulty: "Beginner",
    instructions: [
      "Choose a quiet path or space 10-20 steps long",
      "Begin standing still, noticing your body and breath",
      "Start walking very slowly, feeling each foot contact the ground",
      "Coordinate with breath: inhale for 2-3 steps, exhale 2-3 steps",
      "When you reach the end, pause and turn mindfully",
      "Notice surroundings without judgment - sounds, sights, sensations",
      "If mind wanders, gently return attention to feet and breath",
      "End standing still, appreciating the present moment"
    ],
    benefits: [
      "Combines meditation with gentle physical activity",
      "Grounds awareness in the present moment",
      "Reduces rumination and anxiety",
      "Accessible for those who struggle with sitting meditation"
    ],
    tips: [
      "Walk slower than you think - almost in slow motion",
      "Can be done indoors in a hallway or small space",
      "Use outdoors to connect with nature"
    ],
    modifications: {
      easier: "Walk at normal pace with mindful attention",
      harder: "Try walking barefoot or with eyes closed (safely)"
    },
    scientificBacking: "Walking meditation increases grey matter in areas associated with emotional regulation and reduces default mode network activity linked to depression and anxiety."
  },
  {
    title: "Box Breathing",
    category: "calm",
    duration: "4 min",
    rating: 4.8,
    description: "Square breathing pattern for instant calm",
    difficulty: "Beginner",
    instructions: [
      "Sit in comfortable position with spine straight",
      "Exhale completely to empty lungs",
      "Inhale through nose for 4 counts",
      "Hold breath for 4 counts",
      "Exhale through mouth for 4 counts",
      "Hold empty for 4 counts",
      "Repeat cycle 8-12 times",
      "Focus on the square pattern and counting"
    ],
    benefits: [
      "Balances autonomic nervous system",
      "Improves focus and concentration",
      "Reduces acute stress and anxiety",
      "Enhances oxygen efficiency"
    ],
    tips: [
      "Count at comfortable pace - no rushing",
      "Visualize drawing a square while breathing",
      "Use before stressful situations for best results"
    ],
    modifications: {
      easier: "Use 3-3-3-3 count or breathe normally if feeling dizzy",
      harder: "Progress to 6-6-6-6 or 8-8-8-8 count"
    },
    scientificBacking: "Navy SEALs use box breathing to manage stress. Research shows it reduces cortisol levels by 25% and improves decision-making under pressure."
  },
  {
    title: "Body Scan Meditation",
    category: "calm",
    duration: "12 min",
    rating: 4.7,
    description: "Progressive awareness throughout your body",
    difficulty: "Beginner",
    instructions: [
      "Lie down comfortably or sit with full back support",
      "Close eyes and take 3 deep, releasing breaths",
      "Start at top of head, notice any sensations without changing them",
      "Slowly move attention down: forehead, eyes, jaw, neck",
      "Continue through shoulders, arms, hands, finger by finger",
      "Scan chest, heart area, breathing naturally",
      "Move through abdomen, lower back, hips, pelvis",
      "Progress down legs: thighs, knees, calves, feet, toes",
      "Finish with whole-body awareness and gratitude"
    ],
    benefits: [
      "Develops body awareness and mindfulness",
      "Releases physical tension and stress",
      "Improves sleep and reduces insomnia",
      "Teaches non-judgmental observation"
    ],
    tips: [
      "Don't try to change sensations, just notice them",
      "If you fall asleep, that's perfectly normal",
      "Return gently to practice if mind wanders"
    ],
    modifications: {
      easier: "Use guided audio or focus on larger body regions",
      harder: "Extend to 20+ minutes or include breath awareness"
    },
    scientificBacking: "fMRI studies show body scan meditation increases interoceptive awareness and reduces activity in pain-processing brain regions by up to 40%."
  },
  {
    title: "Mindful Breathing",
    category: "calm",
    duration: "6 min",
    rating: 4.5,
    description: "Simple breath awareness practice",
    difficulty: "Beginner",
    instructions: [
      "Find comfortable seated position with eyes closed or soft gaze",
      "Begin breathing naturally without controlling it",
      "Notice the sensation of breath entering and leaving nostrils",
      "Count breaths from 1 to 10, then start over at 1",
      "When mind wanders (it will), gently return to counting at 1",
      "Notice the pause between inhale and exhale",
      "Observe breath becoming naturally slower and deeper",
      "End by appreciating this moment of peace"
    ],
    benefits: [
      "Develops concentration and mental clarity",
      "Reduces stress and emotional reactivity",
      "Improves emotional regulation",
      "Accessible foundation for all meditation practices"
    ],
    tips: [
      "Wandering mind is normal - be patient and kind",
      "No need to breathe deeply - let it be natural",
      "Practice same time daily for habit formation"
    ],
    modifications: {
      easier: "Count to 5 instead of 10, or just focus on sensation",
      harder: "Extend session or focus on subtle breath sensations"
    },
    scientificBacking: "Just 6 minutes of mindful breathing activates the prefrontal cortex and reduces amygdala reactivity, creating measurable calm that lasts 2-4 hours."
  },
  {
    title: "Stress Release",
    category: "calm",
    duration: "8 min",
    rating: 4.9,
    description: "Let go of tension and worry",
    difficulty: "Intermediate",
    instructions: [
      "Identify current stress or tension in your body",
      "Take 5 deep breaths, exhaling stress with each out-breath",
      "Progressive muscle release: tense each muscle group 5 seconds, then relax",
      "Start with face and scalp, work down through whole body",
      "Visualize stress leaving body like dark clouds dissolving",
      "Practice loving-kindness: send compassion to yourself first",
      "Extend compassion to sources of your stress",
      "End with affirmation: 'I am peaceful and capable'"
    ],
    benefits: [
      "Provides immediate stress relief",
      "Teaches healthy coping mechanisms",
      "Reduces physical stress symptoms",
      "Builds emotional resilience"
    ],
    tips: [
      "Use when feeling overwhelmed or anxious",
      "Practice regularly to build stress immunity",
      "Combine with gentle movement if helpful"
    ],
    modifications: {
      easier: "Focus only on breathing and gentle stretching",
      harder: "Add journaling or explore root causes of stress"
    },
    scientificBacking: "Combined muscle relaxation and mindfulness reduces cortisol levels by 35% and activates the relaxation response within 8-10 minutes of practice."
  },
  {
    title: "Evening Wind Down",
    category: "calm",
    duration: "15 min",
    rating: 4.6,
    description: "Peaceful transition into rest mode",
    difficulty: "Beginner",
    instructions: [
      "Dim lights and create calm environment (phones away)",
      "Reflect on day: 3 things you're grateful for",
      "Gentle stretching: neck, shoulders, hips (5 minutes)",
      "Legs up wall pose or supported child's pose (3 minutes)",
      "Transition breathing: longer exhales than inhales",
      "Progressive relaxation: release tension from feet to head",
      "Set positive intention for tomorrow",
      "End in comfortable rest position with soft music"
    ],
    benefits: [
      "Signals body to prepare for sleep",
      "Processes daily experiences positively",
      "Reduces sleep latency and improves quality",
      "Creates healthy evening routine"
    ],
    tips: [
      "Start 1-2 hours before desired bedtime",
      "Keep temperature cool and environment dark",
      "Avoid screens during this practice"
    ],
    modifications: {
      easier: "Focus only on gratitude and gentle breathing",
      harder: "Add journaling or extended meditation"
    },
    scientificBacking: "Evening wind-down routines increase melatonin production by 20% and improve sleep efficiency by reducing the time needed to fall asleep."
  },
  {
    title: "Anxiety Relief",
    category: "calm",
    duration: "7 min",
    rating: 4.8,
    description: "Techniques to ease anxious feelings",
    difficulty: "Intermediate",
    instructions: [
      "Acknowledge anxiety without judgment: 'I notice I feel anxious'",
      "Ground with 5-4-3-2-1 technique: 5 things you see, 4 hear, 3 feel, 2 smell, 1 taste",
      "Calming breath: inhale for 4, hold for 2, exhale for 6",
      "Self-soothing touch: hand on heart or gentle self-hug",
      "Positive self-talk: 'This feeling will pass, I am safe'",
      "Visualization: imagine safe, peaceful place in detail",
      "Gentle movement: shoulder rolls, neck stretches",
      "End with self-compassion and encouragement"
    ],
    benefits: [
      "Interrupts anxiety spiral quickly",
      "Provides practical coping tools",
      "Builds confidence in managing anxiety",
      "Reduces physical anxiety symptoms"
    ],
    tips: [
      "Practice when calm to be prepared for anxious moments",
      "Customize techniques to what works best for you",
      "Remember: anxiety is temporary and manageable"
    ],
    modifications: {
      easier: "Use just grounding technique and breathing",
      harder: "Explore underlying thoughts and practice cognitive restructuring"
    },
    scientificBacking: "Grounding techniques and controlled breathing reduce anxiety by 40-60% within 5-10 minutes by engaging the parasympathetic nervous system and prefrontal cortex."
  },
  {
    title: "Loving Kindness",
    category: "calm",
    duration: "9 min",
    rating: 4.7,
    description: "Cultivate compassion and inner peace",
    difficulty: "Beginner",
    instructions: [
      "Sit comfortably and bring to mind your own image",
      "Offer yourself phrases: 'May I be happy, may I be peaceful, may I be free from suffering'",
      "Repeat phrases with genuine intention (2 minutes)",
      "Bring to mind someone you love, offer same phrases to them",
      "Think of neutral person (acquaintance), extend loving wishes",
      "Consider someone difficult, send compassion (start small)",
      "Expand to all beings everywhere: 'May all beings be happy and free'",
      "Return to yourself with appreciation for your compassionate heart"
    ],
    benefits: [
      "Increases self-compassion and empathy",
      "Reduces negative emotions and criticism",
      "Improves relationships and social connection",
      "Builds resilience and emotional well-being"
    ],
    tips: [
      "Start with easier targets before difficult people",
      "Use phrases that resonate personally with you",
      "Don't worry if feelings don't match words initially"
    ],
    modifications: {
      easier: "Focus only on self and loved ones",
      harder: "Include specific challenging relationships or global situations"
    },
    scientificBacking: "Loving-kindness meditation increases vagal tone, grey matter volume in emotional processing areas, and positive emotions by 25% after just 7 weeks of practice."
  },
  {
    title: "Nature Sounds",
    category: "calm",
    duration: "20 min",
    rating: 4.4,
    description: "Relaxation with natural soundscapes",
    difficulty: "Beginner",
    instructions: [
      "Choose comfortable position lying down or reclining",
      "Put on natural soundscape: ocean, rain, forest, or flowing water",
      "Close eyes and let sounds wash over you without analyzing",
      "Imagine yourself in that natural environment",
      "Breathe naturally and let body sink into relaxation",
      "If mind wanders, gently return attention to sounds",
      "Notice how different sounds affect your body and mood",
      "Allow complete rest - it's okay to fall asleep"
    ],
    benefits: [
      "Masks distracting environmental noise",
      "Triggers relaxation response naturally",
      "Connects with calming aspects of nature",
      "Reduces cortisol and blood pressure"
    ],
    tips: [
      "Use quality headphones or speakers for immersion",
      "Experiment with different nature sounds",
      "Perfect for naps or bedtime routine"
    ],
    modifications: {
      easier: "Use familiar, comforting sounds",
      harder: "Combine with visualization or breathing exercises"
    },
    scientificBacking: "Natural soundscapes reduce stress hormones by 30% and activate the parasympathetic nervous system more effectively than silence or music."
  },

  // Focus Activities
  {
    title: "Power Posing",
    category: "focus",
    duration: "2 min",
    rating: 4.8,
    description: "Build confidence and focus with body language",
    difficulty: "Beginner",
    instructions: [
      "Stand with feet hip-width apart, shoulders back",
      "Victory pose: arms raised in V-shape, chin slightly up (30 seconds)",
      "Superman pose: hands on hips, chest open, stand tall (30 seconds)",
      "Wonder Woman: feet wide, hands on hips, strong posture (30 seconds)",
      "Breathe deeply and confidently throughout",
      "Feel the strength and capability in your body",
      "End with positive affirmation about your abilities"
    ],
    benefits: [
      "Increases testosterone and confidence hormones",
      "Reduces cortisol and stress hormones",
      "Improves performance and risk tolerance",
      "Enhances feelings of power and control"
    ],
    tips: [
      "Use before important meetings or challenges",
      "Hold poses with genuine conviction",
      "Practice in private space for comfort"
    ],
    modifications: {
      easier: "Perform seated with upper body postures",
      harder: "Add visualization of successful outcomes"
    },
    scientificBacking: "Amy Cuddy's research shows 2 minutes of power posing increases testosterone by 16%, decreases cortisol by 25%, and improves performance in high-stakes situations."
  },
  {
    title: "Concentration Builder",
    category: "focus",
    duration: "8 min",
    rating: 4.6,
    description: "Strengthen your ability to concentrate",
    difficulty: "Intermediate",
    instructions: [
      "Choose single focus object: candle flame, dot on paper, or breath",
      "Set intention to maintain attention on this object only",
      "Begin focusing with soft, steady gaze or awareness",
      "When attention drifts, note 'thinking' and return to object",
      "Increase challenge: count breaths to 20 without distraction",
      "If successful, try counting backwards from 20",
      "Advanced: maintain focus without counting aid",
      "End appreciating your concentration ability"
    ],
    benefits: [
      "Builds sustained attention capacity",
      "Improves cognitive control and focus",
      "Reduces mental distractibility",
      "Enhances work and study performance"
    ],
    tips: [
      "Start with shorter periods and build gradually",
      "Don't get frustrated with wandering mind - it's normal",
      "Practice regularly for cumulative benefits"
    ],
    modifications: {
      easier: "Use guided audio or shorter time periods",
      harder: "Add environmental distractions to resist"
    },
    scientificBacking: "Concentration training increases grey matter in attention-related brain regions and improves sustained attention by 40% after 8 weeks of practice."
  },
  {
    title: "Mental Clarity",
    category: "focus",
    duration: "5 min",
    rating: 4.7,
    description: "Clear mental fog and sharpen thinking",
    difficulty: "Beginner",
    instructions: [
      "Sit up straight and take 3 energizing deep breaths",
      "Brain dump: quickly write down all thoughts/worries for 1 minute",
      "Alternate nostril breathing: 10 cycles using thumb and ring finger",
      "Mental decluttering: visualize organizing scattered thoughts into neat files",
      "Set clear intention for what you want to focus on",
      "Brief visualization: see yourself thinking clearly and confidently",
      "End with affirmation: 'My mind is clear, sharp, and focused'"
    ],
    benefits: [
      "Clears mental clutter and overwhelm",
      "Balances left and right brain hemispheres",
      "Improves decision-making ability",
      "Enhances cognitive flexibility"
    ],
    tips: [
      "Use when feeling mentally scattered or overwhelmed",
      "Practice before important cognitive tasks",
      "Keep pen and paper handy for brain dump"
    ],
    modifications: {
      easier: "Focus only on deep breathing and intention setting",
      harder: "Add problem-solving visualization or goal prioritization"
    },
    scientificBacking: "Alternate nostril breathing balances autonomic nervous system function and increases cognitive performance by improving oxygen flow to both brain hemispheres."
  },
  {
    title: "Attention Training",
    category: "focus",
    duration: "10 min",
    rating: 4.5,
    description: "Develop sustained attention skills",
    difficulty: "Advanced",
    instructions: [
      "Phase 1 (3 min): Focus on breath, counting each inhale/exhale to 100",
      "Phase 2 (3 min): Expand to body awareness while maintaining breath focus",
      "Phase 3 (2 min): Add environmental sounds without losing breath attention",
      "Phase 4 (2 min): Open awareness - notice everything without getting caught",
      "Throughout: when attention wavers, gently return without self-criticism",
      "Track how many times mind wanders without judgment",
      "End reflecting on improvements in attention stability"
    ],
    benefits: [
      "Develops meta-cognitive awareness",
      "Builds resistance to distractions",
      "Improves working memory capacity",
      "Enhances cognitive flexibility and control"
    ],
    tips: [
      "Think of it as mental gym workout",
      "Progress gradually through phases",
      "Celebrate small improvements in attention span"
    ],
    modifications: {
      easier: "Reduce phases to 2-3 minutes each",
      harder: "Extend to 15-20 minutes or add complex counting patterns"
    },
    scientificBacking: "Attention training increases density in brain networks responsible for executive attention and reduces mind-wandering by up to 50% in regular practitioners."
  },
  {
    title: "Flow State Prep",
    category: "focus",
    duration: "6 min",
    rating: 4.8,
    description: "Prepare your mind for deep work",
    difficulty: "Intermediate",
    instructions: [
      "Clear physical and digital distractions from workspace",
      "Set specific, challenging but achievable goal for work session",
      "Progressive muscle relaxation: release tension that could distract",
      "Breathing for alertness: 6-2-6 pattern (inhale-hold-exhale)",
      "Visualization: see yourself working with complete focus and enjoyment",
      "Set timer for focused work period (suggest 25-90 minutes)",
      "Begin work immediately after this preparation"
    ],
    benefits: [
      "Increases likelihood of entering flow state",
      "Optimizes arousal level for peak performance",
      "Reduces procrastination and mental resistance",
      "Enhances intrinsic motivation for tasks"
    ],
    tips: [
      "Match challenge level to current skill level",
      "Turn off all notifications during flow session",
      "Use for important, creative, or challenging work"
    ],
    modifications: {
      easier: "Focus on removing distractions and setting simple goals",
      harder: "Add specific skill visualization and performance imagery"
    },
    scientificBacking: "Flow state preparation techniques increase focus hormones (norepinephrine) and reduce self-criticism, leading to 500% improvement in creative problem-solving."
  },
  {
    title: "Cognitive Reset",
    category: "focus",
    duration: "4 min",
    rating: 4.6,
    description: "Refresh your mental state",
    difficulty: "Beginner",
    instructions: [
      "Step away from current task completely",
      "Vigorous breathing: 10 strong exhales to release mental tension",
      "Physical reset: gentle neck rolls, shoulder shrugs, hand shakes",
      "Mental palate cleanser: think about something completely different for 1 minute",
      "Hydration check: drink water mindfully",
      "Refocus ritual: state your next priority out loud",
      "Return to task with fresh perspective and energy"
    ],
    benefits: [
      "Breaks unproductive thought patterns",
      "Restores mental energy and clarity",
      "Prevents cognitive fatigue accumulation",
      "Improves problem-solving through fresh perspective"
    ],
    tips: [
      "Use between tasks or when feeling stuck",
      "Make it a regular habit every 90 minutes",
      "Customize reset activities to your preferences"
    ],
    modifications: {
      easier: "Use just breathing and hydration",
      harder: "Add brief walk or more extensive physical movement"
    },
    scientificBacking: "Cognitive resets restore glucose to the prefrontal cortex and reduce decision fatigue, improving subsequent task performance by 25-40%."
  },

  // Rest Activities
  {
    title: "Progressive Relaxation",
    category: "rest",
    duration: "12 min",
    rating: 4.9,
    description: "Systematic muscle relaxation for deep rest",
    difficulty: "Intermediate",
    instructions: [
      "Lie comfortably with eyes closed, arms at sides",
      "Start with feet: tense all muscles for 5 seconds, then completely relax",
      "Move to calves: tense, hold, release and notice the contrast",
      "Continue systematically: thighs, glutes, abdomen, hands, arms",
      "Tense shoulders, then let them drop with exhale",
      "Face muscles: scrunch everything tight, then smooth and soften",
      "Whole body tense for 5 seconds, then complete release",
      "Rest in total relaxation, enjoying the peaceful feeling"
    ],
    benefits: [
      "Teaches distinction between tension and relaxation",
      "Provides deep physical and mental rest",
      "Reduces chronic muscle tension",
      "Improves sleep quality and reduces insomnia"
    ],
    tips: [
      "Focus on the contrast between tension and relaxation",
      "Don't tense so hard that it causes pain",
      "Allow extra time for areas that hold chronic tension"
    ],
    modifications: {
      easier: "Tense larger muscle groups together",
      harder: "Add visualization of tension melting away"
    },
    scientificBacking: "Progressive muscle relaxation reduces muscle tension by 60%, lowers blood pressure, and activates the relaxation response more effectively than passive rest."
  },
  {
    title: "Sleep Preparation",
    category: "rest",
    duration: "15 min",
    rating: 4.7,
    description: "Gentle routine to prepare for sleep",
    difficulty: "Beginner",
    instructions: [
      "Begin 30-60 minutes before desired sleep time",
      "Gentle stretching: child's pose, knees to chest, gentle spinal twists",
      "Gratitude reflection: three good things from today",
      "Progressive counting: visualize numbers 100 down to 1",
      "Body scan: release tension from head to toe",
      "Calming breath: make exhales longer than inhales",
      "Set positive intention for rest and tomorrow",
      "Transition to comfortable sleep position"
    ],
    benefits: [
      "Signals circadian rhythm to prepare for sleep",
      "Processes daily experiences positively",
      "Reduces sleep onset time",
      "Improves overall sleep quality"
    ],
    tips: [
      "Dim lights during practice",
      "Keep bedroom cool (65-68°F)",
      "Avoid screens for 1 hour before sleep"
    ],
    modifications: {
      easier: "Focus only on breathing and gratitude",
      harder: "Add journaling or extended meditation"
    },
    scientificBacking: "Bedtime routines increase melatonin production by 25% and improve sleep efficiency by reducing time to fall asleep from 30+ minutes to 10-15 minutes."
  },
  {
    title: "Deep Rest",
    category: "rest",
    duration: "20 min",
    rating: 4.8,
    description: "Profound relaxation for complete restoration",
    difficulty: "Beginner",
    instructions: [
      "Find completely comfortable position - use pillows and blankets",
      "Set intention to rest deeply and restore your energy",
      "Begin with 10 deep, releasing breaths",
      "Body scan: systematically relax each body part",
      "Enter witness consciousness: observe thoughts without engaging",
      "Release into complete stillness and peace",
      "Allow natural rest - sleeping is perfectly fine",
      "Gradually return awareness when ready"
    ],
    benefits: [
      "Provides deep physiological restoration",
      "Recharges mental and physical energy",
      "Reduces stress hormones significantly",
      "Improves immune function and healing"
    ],
    tips: [
      "Use after intense physical or mental work",
      "Create comfortable, distraction-free environment",
      "Trust your body's wisdom to rest as needed"
    ],
    modifications: {
      easier: "Use guided audio or soft background music",
      harder: "Practice entering conscious rest without sleeping"
    },
    scientificBacking: "Deep rest practices activate the parasympathetic nervous system for 2-3 hours afterward, reducing cortisol by 40% and improving cellular repair processes."
  },
  {
    title: "Power Nap Prep",
    category: "rest",
    duration: "5 min",
    rating: 4.5,
    description: "Quick relaxation before a short nap",
    difficulty: "Beginner",
    instructions: [
      "Set timer for 20-minute nap (including this prep time)",
      "Find comfortable position in slightly cool, dark environment",
      "Progressive countdown: relax muscles from 10 to 1",
      "Breathing: extend exhales to activate rest response",
      "Release all responsibilities and to-dos temporarily",
      "Allow body to sink into rest without forcing sleep",
      "Trust the process - even quiet rest is beneficial"
    ],
    benefits: [
      "Optimizes short nap effectiveness",
      "Prevents deep sleep that causes grogginess",
      "Provides quick energy restoration",
      "Improves afternoon alertness and performance"
    ],
    tips: [
      "Nap between 1-3 PM for best circadian alignment",
      "Keep naps under 30 minutes to avoid sleep inertia",
      "Use eye mask and earplugs if needed"
    ],
    modifications: {
      easier: "Just rest quietly with eyes closed",
      harder: "Add visualization of energy restoration"
    },
    scientificBacking: "Strategic 20-minute naps improve cognitive performance by 35% and increase alertness for 3-4 hours without disrupting nighttime sleep."
  },
  {
    title: "Tension Release",
    category: "rest",
    duration: "8 min",
    rating: 4.6,
    description: "Release physical and mental tension",
    difficulty: "Beginner",
    instructions: [
      "Identify areas of physical tension in your body",
      "Gentle stretching: focus on tight areas with slow movements",
      "Breathwork: exhale tension, inhale relaxation",
      "Mental tension release: acknowledge worries, then let them go",
      "Self-massage: neck, shoulders, temples, anywhere that feels tight",
      "Visualization: tension melting away like warm butter",
      "Affirmations: 'I release what I cannot control'",
      "End in comfortable rest position"
    ],
    benefits: [
      "Provides immediate relief from physical tension",
      "Reduces mental stress and worry",
      "Improves circulation and flexibility",
      "Teaches healthy stress release techniques"
    ],
    tips: [
      "Use when feeling physically or mentally tight",
      "Pay attention to areas where you hold stress",
      "Combine with warm bath or shower for enhanced effect"
    ],
    modifications: {
      easier: "Focus only on breathing and gentle stretches",
      harder: "Add foam rolling or more extensive self-massage"
    },
    scientificBacking: "Tension release techniques reduce muscle tension by 50% and lower stress hormones within 10 minutes by activating mechanoreceptors that calm the nervous system."
  },
  {
    title: "Restorative Breathing",
    category: "rest",
    duration: "10 min",
    rating: 4.7,
    description: "Breathing practice for deep restoration",
    difficulty: "Beginner",
    instructions: [
      "Lie down comfortably with one hand on chest, one on belly",
      "Breathe naturally and notice which hand moves more",
      "Shift to belly breathing: expand abdomen on inhale",
      "Extend exhales: inhale for 4, exhale for 6-8 counts",
      "Add gentle pause after each exhale",
      "Breathe with intention of restoration and healing",
      "Visualize breath bringing energy in, carrying tension out",
      "End with appreciation for your body's wisdom"
    ],
    benefits: [
      "Activates parasympathetic nervous system",
      "Improves oxygen efficiency and circulation",
      "Reduces stress hormones and promotes healing",
      "Enhances sleep quality when practiced before bed"
    ],
    tips: [
      "Place light weight on belly to enhance awareness",
      "Practice regularly to retrain breathing patterns",
      "Use anytime you need to restore energy"
    ],
    modifications: {
      easier: "Just focus on natural belly breathing",
      harder: "Add specific breath counts like 4-4-6-2 pattern"
    },
    scientificBacking: "Diaphragmatic breathing increases vagal tone by 30%, reduces cortisol levels, and improves heart rate variability - key markers of stress resilience and recovery."
  }
];