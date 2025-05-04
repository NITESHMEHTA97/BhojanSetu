import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { cn } from '@/lib/utils';
import { MapPin, Utensils, Clock, Phone, Mail, CheckCircle, XCircle, AlertTriangle, Loader2, MessageSquare, Users, Building2, Calendar as CalendarIcon, Truck } from 'lucide-react';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Data (Replace with actual API calls)
const mockNGOs = [
  { id: 'ngo1', name: 'Helping Hands Shelter', address: '123 Charity St, Anytown', contactPerson: 'Alice Johnson', phone: '555-1234', email: 'alice@hands.org' },
  { id: 'ngo2', name: 'Food Forward Initiative', address: '456 Hope Ave, Anytown', contactPerson: 'Bob Smith', phone: '555-5678', email: 'bob@foodforward.org' },
  { id: 'ngo3', name: 'Community Food Bank', address: '789 Unity Blvd, Anytown', contactPerson: 'Carol Williams', phone: '555-9012', email: 'carol@foodbank.org' },
];

const mockCaterers = [
    { id: 'caterer1', name: 'Delicious Dishes Catering', address: '100 Main St, Anytown', contactPerson: 'John Doe', phone: '555-1111', email: 'john@dishes.com' },
    { id: 'caterer2', name: 'Gourmet Meals Inc.', address: '200 Oak Ave, Anytown', contactPerson: 'Jane Smith', phone: '555-2222', email: 'jane@gourmet.com' },
    { id: 'caterer3', name: 'Party Platters R Us', address: '300 Pine Ln, Anytown', contactPerson: 'Mike Johnson', phone: '555-3333', email: 'mike@platters.com' },
];

// Animation Variants
const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeInOut' } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
};

// Helper Components
const FoodTypeIcon = ({ type }: { type: string }) => {
    switch (type) {
        case 'Prepared Meals':
            return <Utensils className="mr-2 h-4 w-4" />;
        case 'Raw Ingredients':
            return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0-2.25a2.25 2.25 0 001.591 1.591l2.25 2.25m-2.25-2.25L10.5 7.5m6.364 1.591l2.25-2.25M12 12.75l-2.25-2.25m0 0l-2.25 2.25m2.25-2.25v7.5m0-7.5a2.25 2.25 0 011.591-1.591l2.25-2.25m-2.25 2.25l-2.25 2.25" />
            </svg>;
        case 'Bakery Items':
            return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.25v2.25c0 .668.971 1.201 2.166 1.099l.381-.034a5.91 5.91 0 014.305 4.305l-.034.381c-.102 1.195.431 2.166 1.099 2.166h2.25c.668 0 1.201-.971 1.099-2.166l-.034-.381a5.91 5.91 0 014.305-4.305l.381.034c1.195.102 2.166-.431 2.166-1.099V8.25m0 0h-1.5M3 8.25h1.5m15 6.75a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
            </svg>
        default:
            return <Utensils className="mr-2 h-4 w-4" />;
    }
};

const UserRoleIcon = ({ role }: { role: string }) => {
    switch (role) {
        case 'Caterer':
            return <Building2 className="mr-2 h-4 w-4" />;
        case 'NGO':
            return <Users className="mr-2 h-4 w-4" />;
        default:
            return null;
    }
};

const ContactInfo = ({ contactPerson, phone, email }: { contactPerson: string, phone: string, email: string }) => (
    <div className="space-y-1">
        <p><span className="font-semibold">Contact:</span> {contactPerson}</p>
        <p><Phone className="inline-block mr-1 h-4 w-4" />{phone}</p>
        <p><Mail className="inline-block mr-1 h-4 w-4" />{email}</p>
    </div>
);

const DateTimeInfo = ({ date, time }: { date: Date | undefined, time: string }) => {
    if (!date) return <p>Date/Time: Not specified</p>;
    return (
        <p><Clock className="inline-block mr-1 h-4 w-4" />{format(date, 'PPP')} at {time}</p>
    );
};

// Components

const HomeScreen = ({ userRole, onPostDonation, availableFood, onClaimDonation, claimedDonations }: {
    userRole: 'Caterer' | 'NGO',
    onPostDonation: () => void,
    availableFood: FoodDonation[],
    onClaimDonation: (id: string, details: ClaimDetails) => void,
    claimedDonations: ClaimedDonation[]
}) => {
    const [selectedFoodItem, setSelectedFoodItem] = useState<FoodDonation | null>(null);
    const [claimDetails, setClaimDetails] = useState<ClaimDetails>({
        pickupDate: undefined,
        pickupTime: '',
        pickupPerson: '',
        transport: '',
        instructions: '',
    });

    const handleClaim = (id: string) => {
        if (!claimDetails.pickupDate || !claimDetails.pickupTime || !claimDetails.pickupPerson || !claimDetails.transport) {
            alert('Please fill in all pickup details.'); // Basic validation
            return;
        }
        onClaimDonation(id, claimDetails);
        setSelectedFoodItem(null); // Close dialog
        setClaimDetails({  // Reset form
            pickupDate: undefined,
            pickupTime: '',
            pickupPerson: '',
            transport: '',
            instructions: '',
        });
    };

    return (
        <div className="p-4 md:p-6">
            <h2 className="text-2xl font-bold mb-4 md:mb-6 flex items-center">
                <UserRoleIcon role={userRole} /> {userRole} Dashboard
            </h2>

            {userRole === 'Caterer' ? (
                <div className="space-y-4">
                    <Button onClick={onPostDonation} className="mb-4">Post Food Donation</Button>
                    <h3 className="text-lg font-semibold">Active Posts</h3>
                    {/* */}
                    <AnimatePresence>
                        {availableFood.filter(food => food.caterer.id === 'caterer1').map((food) => (
                            <motion.div
                                key={food.id}
                                variants={cardVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <Card className="mb-4">
                                    <CardHeader>
                                        <CardTitle className="flex items-center">
                                            <FoodTypeIcon type={food.type} />{food.type} - {food.quantity}
                                        </CardTitle>
                                        <CardDescription>
                                            Posted on: {format(food.postedDate, 'PPPppp')}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p>{food.description}</p>
                                        <DateTimeInfo date={food.availabilityDate} time={food.availabilityTime} />
                                        <ContactInfo
                                            contactPerson={food.caterer.contactPerson}
                                            phone={food.caterer.phone}
                                            email={food.caterer.email}
                                        />
                                        {food.claimedBy && (
                                            <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded relative" role="alert">
                                                <strong className="font-bold">Claimed! </strong>
                                                <span className="block sm:inline">Claimed by: {food.claimedBy.name}</span>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {availableFood.filter(food => food.caterer.id === 'caterer1').length === 0 && (
                        <p className="text-gray-500">No active posts yet.</p>
                    )}
                </div>
            ) : (
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Available Food</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <AnimatePresence>
                            {availableFood.filter(food => !food.claimedBy).map((food) => (
                                <motion.div
                                    key={food.id}
                                    variants={cardVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center">
                                                <FoodTypeIcon type={food.type} />{food.type} - {food.quantity}
                                            </CardTitle>
                                            <CardDescription>
                                                Posted on: {format(food.postedDate, 'PPPppp')}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <p>{food.description}</p>
                                            <DateTimeInfo date={food.availabilityDate} time={food.availabilityTime} />
                                            <ContactInfo
                                                contactPerson={food.caterer.contactPerson}
                                                phone={food.caterer.phone}
                                                email={food.caterer.email}
                                            />
                                        </CardContent>
                                        <CardFooter>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="outline">Claim Donation</Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-[425px]">
                                                    <DialogHeader>
                                                        <DialogTitle>Claim Donation</DialogTitle>
                                                        <DialogDescription>
                                                            Enter pickup details to claim this donation.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="grid gap-4 py-4">
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <Label htmlFor="pickupDate" className="text-right">
                                                                Pickup Date
                                                            </Label>
                                                            <Calendar
                                                                id="pickupDate"
                                                                mode="single"
                                                                selected={claimDetails.pickupDate}
                                                                onSelect={(date) => setClaimDetails({ ...claimDetails, pickupDate: date })}
                                                                className="col-span-3"
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <Label htmlFor="pickupTime" className="text-right">
                                                                Pickup Time
                                                            </Label>
                                                            <Input
                                                                id="pickupTime"
                                                                value={claimDetails.pickupTime}
                                                                onChange={(e) => setClaimDetails({ ...claimDetails, pickupTime: e.target.value })}
                                                                className="col-span-3"
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <Label htmlFor="pickupPerson" className="text-right">
                                                                Pickup Person
                                                            </Label>
                                                            <Input
                                                                id="pickupPerson"
                                                                value={claimDetails.pickupPerson}
                                                                onChange={(e) => setClaimDetails({ ...claimDetails, pickupPerson: e.target.value })}
                                                                className="col-span-3"
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <Label htmlFor="transport" className="text-right">
                                                                Transportation
                                                            </Label>
                                                            <Input
                                                                id="transport"
                                                                value={claimDetails.transport}
                                                                onChange={(e) => setClaimDetails({ ...claimDetails, transport: e.target.value })}
                                                                className="col-span-3"
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <Label htmlFor="instructions" className="text-right">
                                                                Instructions
                                                            </Label>
                                                            <Textarea
                                                                id="instructions"
                                                                value={claimDetails.instructions}
                                                                onChange={(e) => setClaimDetails({ ...claimDetails, instructions: e.target.value })}
                                                                className="col-span-3"
                                                            />
                                                        </div>
                                                    </div>
                                                    <DialogFooter>
                                                        <Button
                                                            type="button"
                                                            onClick={() => handleClaim(food.id)}
                                                        >
                                                            Confirm Claim
                                                        </Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        </CardFooter>
                                    </Card>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                    {availableFood.filter(food => !food.claimedBy).length === 0 && (
                        <p className="text-gray-500">No food available at the moment.</p>
                    )}

                    <h3 className="text-lg font-semibold mt-6">Claimed Donations</h3>
                    {claimedDonations.length > 0 ? (
                        <div className="space-y-4">
                            {claimedDonations.map((claim) => {
                                const foodItem = availableFood.find((f) => f.id === claim.foodId);
                                return (
                                    foodItem && (
                                        <Card key={claim.id}>
                                            <CardHeader>
                                                <CardTitle className="flex items-center">
                                                    <FoodTypeIcon type={foodItem.type} />{foodItem.type} - {foodItem.quantity}
                                                </CardTitle>
                                                <CardDescription>
                                                    Claimed on: {format(claim.claimedDate, 'PPPppp')}
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <p>Pickup Date: {claim.pickupDetails.pickupDate ? format(claim.pickupDetails.pickupDate, 'PPP') : 'Not set'}</p>
                                                <p>Pickup Time: {claim.pickupDetails.pickupTime || 'Not set'}</p>
                                                <p>Pickup Person: {claim.pickupDetails.pickupPerson || 'Not set'}</p>
                                                <p>Transportation: {claim.pickupDetails.transport || 'Not set'}</p>
                                                <ContactInfo
                                                    contactPerson={foodItem.caterer.contactPerson}
                                                    phone={foodItem.caterer.phone}
                                                    email={foodItem.caterer.email}
                                                />
                                            </CardContent>
                                        </Card>
                                    )
                                );
                            })}
                        </div>
                    ) : (
                        <p className="text-gray-500">No claimed donations yet.</p>
                    )}
                </div>
            )}
        </div>
    );
};

const PostDonationScreen = ({ onPost, caterer }: { onPost: (donation: FoodDonation) => void, caterer: Caterer }) => {
    const [foodType, setFoodType] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [availabilityDate, setAvailabilityDate] = useState<Date | undefined>();
    const [availabilityTime, setAvailabilityTime] = useState('');
    const [photos, setPhotos] = useState<File[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [postStatus, setPostStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handlePost = () => {
        if (!foodType || !quantity || !description || !availabilityDate || !availabilityTime) {
            alert('Please fill in all required fields.'); // Basic validation
            setPostStatus('error');
            return;
        }

        setIsSubmitting(true);
        setPostStatus('idle');

        // Simulate API call delay
        setTimeout(() => {
            const newDonation: FoodDonation = {
                id: `donation-${Date.now()}`, // Generate unique ID
                type: foodType,
                quantity,
                description,
                availabilityDate,
                availabilityTime,
                postedDate: new Date(),
                caterer: caterer, // Use the caterer object
                photos: photos.map(file => URL.createObjectURL(file)), // Convert files to URLs
                claimedBy: null, // Initially not claimed
            };
            onPost(newDonation);
            setIsSubmitting(false);
            setPostStatus('success');

            // Reset form
            setFoodType('');
            setQuantity('');
            setDescription('');
            setAvailabilityDate(undefined);
            setAvailabilityTime('');
            setPhotos([]);
            setTimeout(()=> setPostStatus('idle'), 3000)

        }, 1000); // Simulate 1-second delay
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setPhotos(Array.from(e.target.files));
        }
    };

    return (
        <div className="p-4 md:p-6">
            <h2 className="text-2xl font-bold mb-4 md:mb-6">Post Food Donation</h2>
            <Card className="w-full">
                <CardContent>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="foodType" className="block text-sm font-medium text-gray-700">Food Type</Label>
                                <Select onValueChange={setFoodType} value={foodType}>
                                    <SelectTrigger id="foodType" className="w-full">
                                        <SelectValue placeholder="Select a food type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Prepared Meals">Prepared Meals</SelectItem>
                                        <SelectItem value="Raw Ingredients">Raw Ingredients</SelectItem>
                                        <SelectItem value="Bakery Items">Bakery Items</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</Label>
                                <Input
                                    id="quantity"
                                    placeholder="e.g., 50 kg, 100 servings"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    className="w-full"
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</Label>
                            <Textarea
                                id="description"
                                placeholder="Enter details about the food"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="availabilityDate" className="block text-sm font-medium text-gray-700">Availability Date</Label>
                                <Calendar
                                    id="availabilityDate"
                                    mode="single"
                                    selected={availabilityDate}
                                    onSelect={setAvailabilityDate}
                                    className="w-full"
                                />
                            </div>
                            <div>
                                <Label htmlFor="availabilityTime" className="block text-sm font-medium text-gray-700">Availability Time</Label>
                                <Input
                                    id="availabilityTime"
                                    placeholder="e.g., 10:00 AM - 2:00 PM"
                                    value={availabilityTime}
                                    onChange={(e) => setAvailabilityTime(e.target.value)}
                                    className="w-full"
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="photos" className="block text-sm font-medium text-gray-700">Photos</Label>
                            <Input
                                id="photos"
                                type="file"
                                multiple
                                onChange={handleFileChange}
                                className="w-full"
                                accept="image/*"
                            />
                            {photos.length > 0 && (
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {photos.map((file, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={URL.createObjectURL(file)}
                                                alt={`Preview ${index + 1}`}
                                                className="h-16 w-16 object-cover rounded"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={handlePost} disabled={isSubmitting} className="w-full">
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Posting...
                            </>
                        ) : (
                            'Post Donation'
                        )}
                    </Button>
                </CardFooter>
                <AnimatePresence>
                    {postStatus === 'success' && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded relative"
                            role="alert"
                        >
                            <CheckCircle className="inline-block mr-2 h-5 w-5" />
                            <strong className="font-bold">Success! </strong>
                            <span className="block sm:inline">Your donation has been posted.</span>
                        </motion.div>
                    )}
                    {postStatus === 'error' && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded relative"
                            role="alert"
                        >
                            <AlertTriangle className="inline-block mr-2 h-5 w-5" />
                            <strong className="font-bold">Error! </strong>
                            <span className="block sm:inline">Please check the form and try again.</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Card>
        </div>
    );
};

// Main App Component
interface FoodDonation {
    id: string;
    type: string;
    quantity: string;
    description: string;
    availabilityDate: Date | undefined;
    availabilityTime: string;
    postedDate: Date;
    caterer: Caterer;
    photos: string[];
    claimedBy: NGO | null;
}

interface ClaimDetails {
    pickupDate: Date | undefined;
    pickupTime: string;
    pickupPerson: string;
    transport: string;
    instructions: string;
}

interface ClaimedDonation {
    id: string;
    foodId: string;
    claimedDate: Date;
    pickupDetails: ClaimDetails;
    ngo: NGO;
}

interface User {
    id: string;
    name: string;
    address: string;
    contactPerson: string;
    phone: string;
    email: string;
}
interface Caterer extends User { }
interface NGO extends User { }

const FoodConnectApp = () => {
    const [userRole, setUserRole] = useState<'Caterer' | 'NGO'>('Caterer'); // Or 'NGO'
    const [availableFood, setAvailableFood] = useState<FoodDonation[]>([]);
    const [claimedDonations, setClaimedDonations] = useState<ClaimedDonation[]>([]);
    const [currentUser, setCurrentUser] = useState<Caterer | NGO>(mockCaterers[0]); //mock Caterer

    const handlePostDonation = useCallback((donation: FoodDonation) => {
        setAvailableFood((prevFood) => [...prevFood, donation]);
    }, []);

    const handleClaimDonation = useCallback((foodId: string, details: ClaimDetails) => {
        setAvailableFood(prevFood =>
            prevFood.map(food =>
                food.id === foodId
                    ? { ...food, claimedBy: currentUser as NGO } // Cast to NGO
                    : food
            )
        );

        const newClaim: ClaimedDonation = {
            id: `claim-${Date.now()}`,
            foodId,
            claimedDate: new Date(),
            pickupDetails: details,
            ngo: currentUser as NGO
        };
        setClaimedDonations(prevClaims => [...prevClaims, newClaim]);
    }, [currentUser]);

    const caterer = mockCaterers.find(c => c.id === 'caterer1')!; //hardcoded
    const ngo = mockNGOs.find(n => n.id === 'ngo1')!;

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow-md py-4">
                <div className="container mx-auto flex justify-between items-center px-4">
                    <h1 className="text-2xl font-bold">FoodConnect</h1>
                    <div className="flex gap-4">
                        <Button
                            variant={userRole === 'Caterer' ? 'default' : 'outline'}
                            onClick={() => {
                                setUserRole('Caterer');
                                setCurrentUser(mockCaterers[0]); //switch user
                            }}
                        >
                            Caterer
                        </Button>
                        <Button
                            variant={userRole === 'NGO' ? 'default' : 'outline'}
                            onClick={() => {
                                setUserRole('NGO');
                                setCurrentUser(mockNGOs[0]);
                            }}
                        >
                            NGO
                        </Button>
                    </div>
                </div>
            </header>
            <main className="container mx-auto px-4 py-8">
                {userRole === 'Caterer' ? (
                    availableFood.find(food => food.caterer.id === 'caterer1') ?
                        <HomeScreen
                            userRole={userRole}
                            onPostDonation={() => { }}
                            availableFood={availableFood}
                            onClaimDonation={handleClaimDonation}
                            claimedDonations={claimedDonations}
                        /> :
                        <PostDonationScreen onPost={handlePostDonation} caterer={caterer} />
                ) : (
                    <HomeScreen
                        userRole={userRole}
                        onPostDonation={() => { }}
                        availableFood={availableFood}
                        onClaimDonation={handleClaimDonation}
                        claimedDonations={claimedDonations}
                    />
                )}
            </main>
            <footer className="bg-gray-800 text-white py-4 mt-8">
                <div className="container mx-auto text-center px-4">
                    <p>&copy; {new Date().getFullYear()} FoodConnect. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default FoodConnectApp;
